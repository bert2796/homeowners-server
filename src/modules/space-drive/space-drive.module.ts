import { Module } from '@nestjs/common';

import { ConfigModule } from '../config/config.module';
import { SpaceDriveService } from './space-drive.service';

@Module({
  exports: [SpaceDriveService],
  imports: [ConfigModule],
  providers: [SpaceDriveService],
})
export class SpaceDriveModule {}
