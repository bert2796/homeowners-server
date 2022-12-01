import { Module } from '@nestjs/common';

import { PrismaModule } from '../prisma/prisma.module';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
  controllers: [UserController],
  exports: [UserService],
  imports: [PrismaModule],
  providers: [UserService],
})
export class UserModule {}
