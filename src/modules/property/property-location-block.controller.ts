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
import { PropertyLocationBlockService } from './property-location-block.service';

@Controller('propertyLocationBlocks')
export class PropertyLocationBlockController {
  constructor(private readonly service: PropertyLocationBlockService) {}

  @Get('/')
  @HttpCode(HttpStatus.OK)
  @Authorize([UserRoles.Admin, UserRoles.Staff])
  async getPropertyLocationBlocks() {
    return await this.service.findAll();
  }

  @Get('/:id')
  @HttpCode(HttpStatus.OK)
  @Authorize([UserRoles.Admin, UserRoles.Staff])
  async getPropertyLocationBlock(@Param('id') id: string) {
    return await this.service.findOne(+id);
  }

  @Patch('/:id')
  @HttpCode(HttpStatus.OK)
  @Authorize([UserRoles.Admin, UserRoles.Staff])
  async updatePropertyLocationBlock(
    @Param('id') id: string,
    @Body() params: UpdatePropertySettingDto,
  ) {
    return await this.service.update(+id, params);
  }

  @Post('/')
  @HttpCode(HttpStatus.CREATED)
  @Authorize([UserRoles.Admin, UserRoles.Staff])
  async createPropertyLocationBlock(@Body() params: CreatePropertySettingDto) {
    return await this.service.create(params);
  }

  @Delete('/:id')
  @HttpCode(HttpStatus.OK)
  @Authorize([UserRoles.Admin, UserRoles.Staff])
  async deletePropertyLocationBlock(@Param('id') id: string) {
    return await this.service.delete(+id);
  }
}
