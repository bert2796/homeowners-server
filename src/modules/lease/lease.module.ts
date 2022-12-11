import { Module } from '@nestjs/common';

import { ExtraModule } from '../extra/extra.module';
import { PrismaModule } from '../prisma/prisma.module';
import { PropertyModule } from '../property/property.module';
import { SpaceDriveModule } from '../space-drive/space-drive.module';
import { UserModule } from '../user/user.module';
import { UtilityModule } from '../utility/utility.module';
import { LeaseController } from './lease.controller';
import { LeaseService } from './lease.service';
import { LeasePaymentController } from './lease-payment.controller';
import { LeasePaymentService } from './lease-payment.service';

@Module({
  controllers: [LeaseController, LeasePaymentController],
  exports: [LeaseService, LeasePaymentService],
  imports: [
    PrismaModule,
    ExtraModule,
    UtilityModule,
    PropertyModule,
    SpaceDriveModule,
    UserModule,
  ],
  providers: [LeaseService, LeasePaymentService],
})
export class LeaseModule {}
