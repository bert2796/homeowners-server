import { Controller, Get, HttpCode, HttpStatus } from '@nestjs/common';
import { UserRoles } from '@prisma/client';

import { Authorize } from '../../commons/decorators/authorize.decorator';
import { PropertyLocationBlockService } from './property-location-block.service';

@Controller('propertyLocationBlocks')
export class PropertyLocationBlockController {
  constructor(private readonly service: PropertyLocationBlockService) {}

  @Get('/')
  @HttpCode(HttpStatus.OK)
  @Authorize([UserRoles.Admin, UserRoles.Staff])
  async getProperties() {
    return await this.service.findAll();
  }
}
