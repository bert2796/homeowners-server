import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Req,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { User, UserRoles } from '@prisma/client';

import { Authorize } from '../../commons/decorators/authorize.decorator';
import { CreateReservationPaymentDto } from './dtos';
import { ReservationPaymentService } from './reservation-payment.service';

@Controller('reservationPayments')
export class ReservationPaymentController {
  constructor(private readonly service: ReservationPaymentService) {}

  @Post('/')
  @UseInterceptors(FilesInterceptor('images'))
  @HttpCode(HttpStatus.CREATED)
  @Authorize([UserRoles.Tenant])
  async createReservationPayment(
    @UploadedFiles() images: Express.Multer.File[],
    @Body() params: CreateReservationPaymentDto,
    @Req() req: { user: User },
  ) {
    return await this.service.create(params, req.user.id, images);
  }

  @Get('/:id')
  @HttpCode(HttpStatus.OK)
  @Authorize()
  async getReservationPayment(@Param('id') id: string) {
    return await this.service.findOne(+id);
  }
}
