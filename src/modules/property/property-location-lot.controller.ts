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
} from '@nestjs/common';
import { UserRoles } from '@prisma/client';

import { Authorize } from '../../commons/decorators/authorize.decorator';
import { CreatePropertySettingDto, UpdatePropertySettingDto } from './dtos';
import { PropertyLocationLotService } from './property-location-lot.service';

@Controller('propertyLocationLots')
export class PropertyLocationLotController {
  constructor(private readonly service: PropertyLocationLotService) {}

  @Get('/')
  @HttpCode(HttpStatus.OK)
  @Authorize([UserRoles.Admin, UserRoles.Staff])
  async getPropertyLocationLots() {
    return await this.service.findAll();
  }

  @Get('/:id')
  @HttpCode(HttpStatus.OK)
  @Authorize([UserRoles.Admin, UserRoles.Staff])
  async getPropertyLocationLot(@Param('id') id: string) {
    return await this.service.findOne(+id);
  }

  @Patch('/:id')
  @HttpCode(HttpStatus.OK)
  @Authorize([UserRoles.Admin, UserRoles.Staff])
  async updatePropertyLocationLot(
    @Param('id') id: string,
    @Body() params: UpdatePropertySettingDto,
  ) {
    return await this.service.update(+id, params);
  }

  @Post('/')
  @HttpCode(HttpStatus.CREATED)
  @Authorize([UserRoles.Admin, UserRoles.Staff])
  async createPropertyLocationLot(@Body() params: CreatePropertySettingDto) {
    return await this.service.create(params);
  }

  @Delete('/:id')
  @HttpCode(HttpStatus.OK)
  @Authorize([UserRoles.Admin, UserRoles.Staff])
  async deletePropertyLocationLot(@Param('id') id: string) {
    return await this.service.delete(+id);
  }
}
