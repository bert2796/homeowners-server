import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  Query,
  Req,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { User, UserRoles } from '@prisma/client';

import { Authorize } from '../../commons/decorators/authorize.decorator';
import { CreateUserDto, UpdatePasswordUserDto, UpdateUserDto } from './dtos';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
  constructor(private readonly service: UserService) {}

  @Get('/me')
  @HttpCode(HttpStatus.OK)
  @Authorize()
  async login(@Req() req: { user: User }) {
    return req.user;
  }

  @Patch('/me')
  @UseInterceptors(FileInterceptor('avatar'))
  @HttpCode(HttpStatus.OK)
  @Authorize()
  async updateMe(
    @Req() req: { user: User },
    @UploadedFile() avatar: Express.Multer.File,
    @Body() params: UpdateUserDto,
  ) {
    return await this.service.update(req.user.id, params, avatar);
  }

  @Patch('/me/password')
  @HttpCode(HttpStatus.OK)
  @Authorize()
  async updateMePassword(
    @Req() req: { user: User },
    @Body() params: UpdatePasswordUserDto,
  ) {
    return await this.service.updatePassword(req.user.id, params);
  }

  @Get('/')
  @HttpCode(HttpStatus.OK)
  @Authorize([UserRoles.Admin, UserRoles.Staff])
  async getUsers(@Query() query: Pick<User, 'role'>) {
    return await this.service.findAll({ where: query });
  }

  @Get('/:id')
  @HttpCode(HttpStatus.OK)
  @Authorize()
  async getUser(@Param('id') id: string) {
    return await this.service.findOne(+id);
  }

  @Patch('/:id')
  @HttpCode(HttpStatus.OK)
  async updateUser(@Param('id') id: string, @Body() params: UpdateUserDto) {
    return await this.service.update(+id, params);
  }

  @Post('/')
  @HttpCode(HttpStatus.CREATED)
  @Authorize([UserRoles.Admin, UserRoles.Staff])
  async createUser(@Body() params: CreateUserDto) {
    return await this.service.create(params);
  }

  @Delete('/:id')
  @HttpCode(HttpStatus.OK)
  @Authorize([UserRoles.Admin, UserRoles.Staff])
  async deleteUser(@Param('id') id: string) {
    return await this.service.delete(+id);
  }
}
