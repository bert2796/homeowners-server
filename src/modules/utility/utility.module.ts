import { Module } from '@nestjs/common';

import { PrismaModule } from '../prisma/prisma.module';
import { UtilityController } from './utility.controller';
import { UtilityService } from './utility.service';

@Module({
  controllers: [UtilityController],
  exports: [UtilityService],
  imports: [PrismaModule],
  providers: [UtilityService],
})
export class UtilityModule {}
