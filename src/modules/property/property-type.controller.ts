import { Controller, Get, HttpCode, HttpStatus } from '@nestjs/common';
import { UserRoles } from '@prisma/client';

import { Authorize } from '../../commons/decorators/authorize.decorator';
import { PropertyTypeService } from './property-type.service';

@Controller('propertyTypes')
export class PropertyTypeController {
  constructor(private readonly service: PropertyTypeService) {}

  @Get('/')
  @HttpCode(HttpStatus.OK)
  @Authorize([UserRoles.Admin, UserRoles.Staff])
  async getProperties() {
    return await this.service.findAll();
  }
}
