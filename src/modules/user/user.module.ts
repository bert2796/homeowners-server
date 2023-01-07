import { Module } from '@nestjs/common';

import { PrismaModule } from '../prisma/prisma.module';
import { SpaceDriveModule } from '../space-drive/space-drive.module';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
  controllers: [UserController],
  exports: [UserService],
  imports: [PrismaModule, SpaceDriveModule],
  providers: [UserService],
})
export class UserModule {}
