import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { LeasePayment } from '@prisma/client';

import { PrismaService } from '../prisma/prisma.service';
import { SpaceDriveService } from '../space-drive/space-drive.service';
import { CreateLeasePaymentDto, UpdateLeasePaymentDto } from './dtos';

@Injectable()
export class LeasePaymentService {
  private readonly logger = new Logger(LeasePaymentService.name);

  constructor(
    private readonly prisma: PrismaService,
    private readonly spaceDriveService: SpaceDriveService,
  ) {}

  private model = this.prisma.leasePayment;
  private findFirst = this.model.findFirst;
  private findMany = this.model.findMany;
  private findUnique = this.model.findUnique;

  private async uploadImages(
    leasePayment: LeasePayment,
    images: Express.Multer.File[],
  ) {
    let currentCount = 0;
    for (const image of images) {
      currentCount++;

      try {
        // upload image
        const fileExtension = image?.mimetype?.split('/')?.[1] || 'jpeg';
        const uploadedImage = await this.spaceDriveService.uploadFile({
          bucket: `homeowners/lease_payment_imagess/${leasePayment.id}`,
          file: image,
          name: `${leasePayment.id}-${currentCount}.${fileExtension}`,
        });

        // create lease payment image
        await this.prisma.leasePaymentImage.create({
          data: {
            leasePaymentId: leasePayment.id,
            url: uploadedImage.Location,
          },
        });
      } catch (error) {
        this.logger.error('Failed to upload lease payment image');
        this.logger.error(error);
      }
    }
  }

  async findOneOrThrow(id: number) {
    const lease = await this.findUnique({ where: { id } });
    if (!lease) {
      throw new HttpException('Lease does not exist.', HttpStatus.BAD_REQUEST);
    }

    return lease;
  }

  async findAll(userId?: number) {
    return await this.findMany({
      include: {
        leasePaymentImages: true,
        user: true,
      },
      where: {
        ...(userId && { userId }),
      },
    });
  }

  async findOne(id: number) {
    const leasePayment = await this.findUnique({
      include: {
        leasePaymentImages: true,
      },
      where: { id },
    });
    if (!leasePayment) {
      throw new HttpException(
        'Lease payment does not exist.',
        HttpStatus.BAD_REQUEST,
      );
    }

    return leasePayment;
  }

  async create(
    params: CreateLeasePaymentDto,
    userId: number,
    images: Express.Multer.File[],
  ) {
    const pendingPayment = await this.findFirst({
      where: {
        leaseId: +params.leaseId,
        status: {
          in: ['Approved', 'Pending'],
        },
      },
    });
    if (pendingPayment) {
      throw new HttpException(
        'Lease payment is already existing',
        HttpStatus.BAD_REQUEST,
      );
    }

    const leasePayment = await this.model.create({
      data: {
        ...params,
        leaseId: +params.leaseId,
        userId,
      },
    });

    if (images?.length) {
      await this.uploadImages(leasePayment, images);
    }

    return leasePayment;
  }

  async update(id: number, params: UpdateLeasePaymentDto) {
    await this.findOneOrThrow(id);

    return await this.model.update({
      data: params,
      where: { id },
    });
  }
}
