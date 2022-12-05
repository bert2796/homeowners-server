import { Module } from '@nestjs/common';

import { PrismaModule } from '../prisma/prisma.module';
import { ExtraController } from './extra.controller';
import { ExtraService } from './extra.service';

@Module({
  controllers: [ExtraController],
  exports: [ExtraService],
  imports: [PrismaModule],
  providers: [ExtraService],
})
export class ExtraModule {}
