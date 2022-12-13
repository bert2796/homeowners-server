import { Injectable, Logger } from '@nestjs/common';

import { LeasePaymentService } from '../lease/lease-payment.service';
import { PrismaService } from '../prisma/prisma.service';
import { ReservationPaymentService } from '../reservation/reservation-payment.service';
import { UpdatePaymentDto } from './dtos';

@Injectable()
export class PaymentService {
  private readonly logger = new Logger(PaymentService.name);

  constructor(
    private readonly prisma: PrismaService,
    private readonly leasePaymentService: LeasePaymentService,
    private readonly reservationPaymentService: ReservationPaymentService,
  ) {}

  async findAll(userId?: number) {
    const leasePayments = await this.leasePaymentService.findAll(userId);
    const reservationPayments = await this.reservationPaymentService.findAll(
      userId,
    );

    const convertedLeasePayments = leasePayments.map((leasePayment) => ({
      ...leasePayment,
      images: leasePayment.leasePaymentImages,
      paymentType: 'lease',
    }));
    const convertedReservationPayments = reservationPayments.map(
      (reservationPayment) => ({
        ...reservationPayment,
        images: reservationPayment.reservationPaymentImages,
        paymentType: 'reservation',
      }),
    );

    return [...convertedLeasePayments, ...convertedReservationPayments].sort(
      (a, b) => b.createdAt.getTime() - a.createdAt.getTime(),
    );
  }

  async update(
    paymentType: 'lease' | 'reservation',
    id: number,
    params: UpdatePaymentDto,
  ) {
    if (paymentType === 'lease') {
      return await this.leasePaymentService.update(id, params);
    } else if (paymentType === 'reservation') {
      return await this.reservationPaymentService.update(id, params);
    }
  }
}
