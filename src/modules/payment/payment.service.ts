import { Injectable, Logger } from '@nestjs/common';

import { LeasePaymentService } from '../lease/lease-payment.service';
import { PrismaService } from '../prisma/prisma.service';
import { UpdatePaymentDto } from './dtos';

@Injectable()
export class PaymentService {
  private readonly logger = new Logger(PaymentService.name);

  constructor(
    private readonly prisma: PrismaService,
    private readonly leasePaymentService: LeasePaymentService,
  ) {}

  async findAll(userId?: number) {
    const leasePayments = await this.leasePaymentService.findAll(userId);

    return leasePayments.map((leasePayment) => ({
      ...leasePayment,
      images: leasePayment.leasePaymentImages,
      paymentType: 'lease',
    }));
  }

  async update(
    paymentType: 'lease' | 'facility',
    id: number,
    params: UpdatePaymentDto,
  ) {
    if (paymentType === 'lease') {
      return await this.leasePaymentService.update(id, params);
    }
  }
}
