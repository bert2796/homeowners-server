import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Query,
  Req,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { User, UserRoles } from '@prisma/client';

import { Authorize } from '../../commons/decorators/authorize.decorator';
import { CreateReservationDto } from './dtos';
import { ReservationService } from './reservation.service';

@Controller('reservations')
export class ReservationController {
  constructor(private readonly service: ReservationService) {}

  @Get('/')
  @HttpCode(HttpStatus.OK)
  @Authorize()
  async getReservations(@Query() query: { userId: string }) {
    return await this.service.findAll(+query.userId);
  }

  @Get('/:id')
  @HttpCode(HttpStatus.OK)
  @Authorize()
  async getReservation(@Param('id') id: string) {
    return await this.service.findOne(+id);
  }

  @Post('/')
  @HttpCode(HttpStatus.CREATED)
  @Authorize([UserRoles.Tenant])
  @UseInterceptors(FilesInterceptor('images'))
  async createReservation(
    @Req() req: { user: User },
    @UploadedFiles() images: Express.Multer.File[],
    @Body() params: CreateReservationDto,
  ) {
    return await this.service.create(params, req.user.id, images);
  }

  @Delete('/:id')
  @HttpCode(HttpStatus.OK)
  @Authorize([UserRoles.Admin, UserRoles.Staff])
  async deleteReservation(@Param('id') id: string) {
    return await this.service.delete(+id);
  }
}
