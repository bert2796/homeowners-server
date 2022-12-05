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
import { PropertyLocationPhaseService } from './property-location-phase.service';

@Controller('propertyLocationPhases')
export class PropertyLocationPhaseController {
  constructor(private readonly service: PropertyLocationPhaseService) {}

  @Get('/')
  @HttpCode(HttpStatus.OK)
  @Authorize([UserRoles.Admin, UserRoles.Staff])
  async getPropertyLocationPhases() {
    return await this.service.findAll();
  }

  @Get('/:id')
  @HttpCode(HttpStatus.OK)
  @Authorize([UserRoles.Admin, UserRoles.Staff])
  async getPropertyLocationPhase(@Param('id') id: string) {
    return await this.service.findOne(+id);
  }

  @Patch('/:id')
  @HttpCode(HttpStatus.OK)
  @Authorize([UserRoles.Admin, UserRoles.Staff])
  async updatePropertyLocationPhase(
    @Param('id') id: string,
    @Body() params: UpdatePropertySettingDto,
  ) {
    return await this.service.update(+id, params);
  }

  @Post('/')
  @HttpCode(HttpStatus.CREATED)
  @Authorize([UserRoles.Admin, UserRoles.Staff])
  async createPropertyLocationPhase(@Body() params: CreatePropertySettingDto) {
    return await this.service.create(params);
  }

  @Delete('/:id')
  @HttpCode(HttpStatus.OK)
  @Authorize([UserRoles.Admin, UserRoles.Staff])
  async deletePropertyLocationPhase(@Param('id') id: string) {
    return await this.service.delete(+id);
  }
}
