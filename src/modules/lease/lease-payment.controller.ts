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
import { CreateLeasePaymentDto } from './dtos';
import { LeasePaymentService } from './lease-payment.service';

@Controller('leasePayments')
export class LeasePaymentController {
  constructor(private readonly service: LeasePaymentService) {}

  @Post('/')
  @UseInterceptors(FilesInterceptor('images'))
  @HttpCode(HttpStatus.CREATED)
  @Authorize([UserRoles.Tenant])
  async createLeasePayment(
    @UploadedFiles() images: Express.Multer.File[],
    @Body() params: CreateLeasePaymentDto,
    @Req() req: { user: User },
  ) {
    return await this.service.create(params, req.user.id, images);
  }

  @Get('/:id')
  @HttpCode(HttpStatus.OK)
  @Authorize()
  async getLeasePayment(@Param('id') id: string) {
    return await this.service.findOne(+id);
  }
}
