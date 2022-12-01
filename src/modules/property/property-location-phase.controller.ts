import { Controller, Get, HttpCode, HttpStatus } from '@nestjs/common';
import { UserRoles } from '@prisma/client';

import { Authorize } from '../../commons/decorators/authorize.decorator';
import { PropertyLocationPhaseService } from './property-location-phase.service';

@Controller('propertyLocationPhases')
export class PropertyLocationPhaseController {
  constructor(private readonly service: PropertyLocationPhaseService) {}

  @Get('/')
  @HttpCode(HttpStatus.OK)
  @Authorize([UserRoles.Admin, UserRoles.Staff])
  async getProperties() {
    return await this.service.findAll();
  }
}
