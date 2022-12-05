import { Module } from '@nestjs/common';

import { ExtraModule } from '../extra/extra.module';
import { PrismaModule } from '../prisma/prisma.module';
import { PropertyModule } from '../property/property.module';
import { UserModule } from '../user/user.module';
import { UtilityModule } from '../utility/utility.module';
import { LeaseController } from './lease.controller';
import { LeaseService } from './lease.service';

@Module({
  controllers: [LeaseController],
  exports: [LeaseService],
  imports: [
    PrismaModule,
    ExtraModule,
    UtilityModule,
    PropertyModule,
    UserModule,
  ],
  providers: [LeaseService],
})
export class LeaseModule {}
