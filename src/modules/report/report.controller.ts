import { Controller, Get, HttpCode, HttpStatus, Param } from '@nestjs/common';
import { UserRoles } from '@prisma/client';

import { Period } from '../../commons/constants';
import { Authorize } from '../../commons/decorators/authorize.decorator';
import { ReportService } from './report.service';

@Controller('reports')
export class ReportController {
  constructor(private readonly service: ReportService) {}

  @Get('/lease-payments/:period')
  @HttpCode(HttpStatus.OK)
  @Authorize([UserRoles.Admin, UserRoles.Staff])
  async getPeriodicityLeasePayments(@Param('period') period: Period) {
    return await this.service.getPeriodicityLeasePayments(period);
  }

  @Get('/utility-charges/:utilityId/:period')
  @HttpCode(HttpStatus.OK)
  @Authorize([UserRoles.Admin, UserRoles.Staff])
  async getPeriodicityUtilityCharges(
    @Param('utilityId') utilityId: string,
    @Param('period') period: Period,
  ) {
    return await this.service.getPeriodicityUtilityCharges(+utilityId, period);
  }

  @Get('/extra-charges/:utilityId/:period')
  @HttpCode(HttpStatus.OK)
  @Authorize([UserRoles.Admin, UserRoles.Staff])
  async getPeriodicityExtraCharges(
    @Param('utilityId') utilityId: string,
    @Param('period') period: Period,
  ) {
    return await this.service.getPeriodicityExtraCharges(+utilityId, period);
  }

  @Get('/reservation-payments/:period')
  @HttpCode(HttpStatus.OK)
  @Authorize([UserRoles.Admin, UserRoles.Staff])
  async getPeriodicityReservationPayments(@Param('period') period: Period) {
    return await this.service.getPeriodicityReservationPayment(period);
  }
}
