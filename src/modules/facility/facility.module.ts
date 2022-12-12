import { Module } from '@nestjs/common';

import { PrismaModule } from '../prisma/prisma.module';
import { SpaceDriveModule } from '../space-drive/space-drive.module';
import { FacilityController } from './facility.controller';
import { FacilityService } from './facility.service';

@Module({
  controllers: [FacilityController],
  exports: [FacilityService],
  imports: [PrismaModule, SpaceDriveModule],
  providers: [FacilityService],
})
export class FacilityModule {}
