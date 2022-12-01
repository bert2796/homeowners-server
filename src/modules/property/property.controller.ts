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
import { CreatePropertyDto, UpdatePropertyDto } from './dtos';
import { PropertyService } from './property.service';

@Controller('properties')
export class PropertyController {
  constructor(private readonly service: PropertyService) {}

  @Get('/')
  @HttpCode(HttpStatus.OK)
  @Authorize([UserRoles.Admin, UserRoles.Staff])
  async getProperties() {
    return await this.service.findAll();
  }

  @Get('/:id')
  @HttpCode(HttpStatus.OK)
  @Authorize([UserRoles.Admin, UserRoles.Staff])
  async getProperty(@Param('id') id: string) {
    return await this.service.findOne(+id);
  }

  @Patch('/:id')
  @HttpCode(HttpStatus.OK)
  @Authorize([UserRoles.Admin, UserRoles.Staff])
  async updateProperty(
    @Param('id') id: string,
    @Body() params: UpdatePropertyDto,
  ) {
    return await this.service.update(+id, params);
  }

  @Post('/')
  @HttpCode(HttpStatus.ACCEPTED)
  @Authorize([UserRoles.Admin, UserRoles.Staff])
  async createUser(@Body() params: CreatePropertyDto) {
    return await this.service.create(params);
  }

  @Delete('/:id')
  @HttpCode(HttpStatus.OK)
  @Authorize([UserRoles.Admin, UserRoles.Staff])
  async deleteProperty(@Param('id') id: string) {
    return await this.service.delete(+id);
  }
}
