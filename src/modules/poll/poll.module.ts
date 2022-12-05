import { Module } from '@nestjs/common';

import { PrismaModule } from '../prisma/prisma.module';
import { PollController } from './poll.controller';
import { PollService } from './poll.service';

@Module({
  controllers: [PollController],
  exports: [PollService],
  imports: [PrismaModule],
  providers: [PollService],
})
export class PollModule {}
