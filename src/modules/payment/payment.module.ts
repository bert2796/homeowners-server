import { Module } from '@nestjs/common';

import { LeaseModule } from '../lease/lease.module';
import { PrismaModule } from '../prisma/prisma.module';
import { PaymentController } from './payment.controller';
import { PaymentService } from './payment.service';

@Module({
  controllers: [PaymentController],
  exports: [PaymentService],
  imports: [PrismaModule, LeaseModule],
  providers: [PaymentService],
})
export class PaymentModule {}
