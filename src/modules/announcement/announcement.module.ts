import { Module } from '@nestjs/common';

import { PrismaModule } from '../prisma/prisma.module';
import { AnnouncementController } from './announcement.controller';
import { AnnouncementService } from './announcement.service';

@Module({
  controllers: [AnnouncementController],
  exports: [AnnouncementService],
  imports: [PrismaModule],
  providers: [AnnouncementService],
})
export class AnnouncementModule {}
