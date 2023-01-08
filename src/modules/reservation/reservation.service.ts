import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import Big from 'big.js';

import { FacilityService } from '../facility/facility.service';
import { PrismaService } from '../prisma/prisma.service';
import { UserService } from '../user/user.service';
import { CreateReservationDto } from './dtos';
import { ReservationPaymentService } from './reservation-payment.service';

@Injectable()
export class ReservationService {
  private readonly logger = new Logger(ReservationService.name);

  constructor(
    private readonly prisma: PrismaService,
    private readonly facilityService: FacilityService,
    private readonly userService: UserService,
    private readonly reservationPaymentService: ReservationPaymentService,
  ) {}

  private model = this.prisma.reservation;
  private findFirst = this.model.findFirst;
  private findMany = this.model.findMany;
  private findUnique = this.model.findUnique;

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
        facility: true,
        reservationPayments: {
          orderBy: {
            id: 'desc',
          },
          take: 1,
        },

        tenant: true,
      },
      ...(userId && { where: { tenantId: userId } }),
    });
  }

  async findOne(id: number) {
    const lease = await this.findUnique({
      include: {
        facility: true,
        tenant: true,
      },
      where: { id },
    });
    if (!lease) {
      throw new HttpException(
        'Reservation does not exist.',
        HttpStatus.BAD_REQUEST,
      );
    }

    return lease;
  }

  async create(
    params: CreateReservationDto,
    userId: number,
    images: Express.Multer.File[],
  ) {
    const reservation = await this.findFirst({
      where: {
        startDate: params.startDate,
      },
    });
    if (reservation) {
      throw new HttpException(
        'Reservation already exist.',
        HttpStatus.BAD_REQUEST,
      );
    }

    // validate facility
    const facility = await this.facilityService.findOneOrThrow(
      +params.facilityId,
    );

    // validate tenant
    await this.userService.findOneOrThrow(+params.tenantId);

    // get time diff
    const timeDiff =
      Math.abs(
        new Date(params.startDate).getTime() -
          new Date(params.endDate).getTime(),
      ) /
      (1000 * 60 * 60);
    const facilityRateType = facility.facilityPaymentSetting.type;
    const facilityRate = facility.facilityPaymentSetting.amount;
    let total = '0';

    if (facilityRateType === 'PerHour') {
      total = new Big(facilityRate).times(timeDiff).toString();
    } else if (facilityRateType === 'WholeDay') {
      total = new Big(facilityRate).times(8).toString();
    }

    const newReservation = await this.model.create({
      data: {
        endDate: params.endDate,
        facilityId: +params.facilityId,
        startDate: params.startDate,
        tenantId: +params.tenantId,
        totalAmount: total,
      },
    });

    // create reservation payment
    if (images.length) {
      await this.reservationPaymentService.create(
        { amount: params.amount, reservationId: newReservation.id },
        userId,
        images,
      );
    }

    return newReservation;
  }

  async delete(id: number) {
    await this.findOneOrThrow(id);

    return await this.model.delete({ where: { id } });
  }
}
