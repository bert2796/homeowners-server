import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Query,
} from '@nestjs/common';
import { UserRoles } from '@prisma/client';

import { Authorize } from '../../commons/decorators/authorize.decorator';
import { UpdatePaymentDto } from './dtos';
import { PaymentService } from './payment.service';

@Controller('payments')
export class PaymentController {
  constructor(private readonly service: PaymentService) {}

  @Get('/')
  @HttpCode(HttpStatus.OK)
  @Authorize()
  async getPayments(@Query() query: { userId: string }) {
    return await this.service.findAll(+query.userId);
  }

  @Patch('/:id/:type')
  @HttpCode(HttpStatus.OK)
  @Authorize([UserRoles.Admin, UserRoles.Staff])
  async updateAnnouncement(
    @Param('id') id: string,
    @Param('type') type: 'lease' | 'reservation',
    @Body() params: UpdatePaymentDto,
  ) {
    return await this.service.update(type, +id, params);
  }
}
