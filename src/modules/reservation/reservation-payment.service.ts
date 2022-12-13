import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { ReservationPayment } from '@prisma/client';

import { PrismaService } from '../prisma/prisma.service';
import { SpaceDriveService } from '../space-drive/space-drive.service';
import {
  CreateReservationPaymentDto,
  UpdateReservationPaymentDto,
} from './dtos';

@Injectable()
export class ReservationPaymentService {
  private readonly logger = new Logger(ReservationPaymentService.name);

  constructor(
    private readonly prisma: PrismaService,
    private readonly spaceDriveService: SpaceDriveService,
  ) {}

  private model = this.prisma.reservationPayment;
  private findFirst = this.model.findFirst;
  private findMany = this.model.findMany;
  private findUnique = this.model.findUnique;

  private async uploadImages(
    reservationPayment: ReservationPayment,
    images: Express.Multer.File[],
  ) {
    let currentCount = 0;
    for (const image of images) {
      currentCount++;

      try {
        // upload image
        const fileExtension = image?.mimetype?.split('/')?.[1] || 'jpeg';
        const uploadedImage = await this.spaceDriveService.uploadFile({
          bucket: `homeowners/reservation_payment_imagess/${reservationPayment.id}`,
          file: image,
          name: `${reservationPayment.id}-${currentCount}.${fileExtension}`,
        });

        // create Reservation payment image
        await this.prisma.reservationPaymentImage.create({
          data: {
            reservationPaymentId: reservationPayment.id,
            url: uploadedImage.Location,
          },
        });
      } catch (error) {
        this.logger.error('Failed to upload Reservation payment image');
        this.logger.error(error);
      }
    }
  }

  async findOneOrThrow(id: number) {
    const Reservation = await this.findUnique({ where: { id } });
    if (!Reservation) {
      throw new HttpException(
        'Reservation does not exist.',
        HttpStatus.BAD_REQUEST,
      );
    }

    return Reservation;
  }

  async findAll(userId?: number) {
    return await this.findMany({
      include: {
        reservationPaymentImages: true,
        user: true,
      },
      where: {
        ...(userId && { userId }),
      },
    });
  }

  async findOne(id: number) {
    const ReservationPayment = await this.findUnique({
      include: {
        reservationPaymentImages: true,
      },
      where: { id },
    });
    if (!ReservationPayment) {
      throw new HttpException(
        'Reservation payment does not exist.',
        HttpStatus.BAD_REQUEST,
      );
    }

    return ReservationPayment;
  }

  async create(
    params: CreateReservationPaymentDto,
    userId: number,
    images: Express.Multer.File[],
  ) {
    const pendingPayment = await this.findFirst({
      where: {
        reservationId: +params.reservationId,
        status: {
          in: ['Approved', 'Pending'],
        },
      },
    });
    if (pendingPayment) {
      throw new HttpException(
        'Reservation payment is already existing',
        HttpStatus.BAD_REQUEST,
      );
    }

    const ReservationPayment = await this.model.create({
      data: {
        ...params,
        reservationId: +params.reservationId,
        userId,
      },
    });

    if (images?.length) {
      await this.uploadImages(ReservationPayment, images);
    }

    return ReservationPayment;
  }

  async update(id: number, params: UpdateReservationPaymentDto) {
    await this.findOneOrThrow(id);

    return await this.model.update({
      data: params,
      where: { id },
    });
  }
}
