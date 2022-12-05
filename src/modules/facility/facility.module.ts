import { Module } from '@nestjs/common';

import { PrismaModule } from '../prisma/prisma.module';
import { FacilityController } from './facility.controller';
import { FacilityService } from './facility.service';

@Module({
  controllers: [FacilityController],
  exports: [FacilityService],
  imports: [PrismaModule],
  providers: [FacilityService],
})
export class FacilityModule {}
