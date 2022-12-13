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
} from '@nestjs/common';
import { UserRoles } from '@prisma/client';

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
  async createReservation(@Body() params: CreateReservationDto) {
    return await this.service.create(params);
  }

  @Delete('/:id')
  @HttpCode(HttpStatus.OK)
  @Authorize([UserRoles.Admin, UserRoles.Staff])
  async deleteReservation(@Param('id') id: string) {
    return await this.service.delete(+id);
  }
}
