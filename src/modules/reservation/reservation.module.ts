import { Module } from '@nestjs/common';

import { FacilityModule } from '../facility/facility.module';
import { PrismaModule } from '../prisma/prisma.module';
import { SpaceDriveModule } from '../space-drive/space-drive.module';
import { UserModule } from '../user/user.module';
import { ReservationController } from './reservation.controller';
import { ReservationService } from './reservation.service';
import { ReservationPaymentController } from './reservation-payment.controller';
import { ReservationPaymentService } from './reservation-payment.service';

@Module({
  controllers: [ReservationController, ReservationPaymentController],
  exports: [ReservationService, ReservationPaymentService],
  imports: [PrismaModule, FacilityModule, SpaceDriveModule, UserModule],
  providers: [ReservationService, ReservationPaymentService],
})
export class ReservationModule {}
