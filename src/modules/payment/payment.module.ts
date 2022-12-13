import { Module } from '@nestjs/common';

import { LeaseModule } from '../lease/lease.module';
import { PrismaModule } from '../prisma/prisma.module';
import { ReservationModule } from '../reservation/reservation.module';
import { PaymentController } from './payment.controller';
import { PaymentService } from './payment.service';

@Module({
  controllers: [PaymentController],
  exports: [PaymentService],
  imports: [PrismaModule, LeaseModule, ReservationModule],
  providers: [PaymentService],
})
export class PaymentModule {}
