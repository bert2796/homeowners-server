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
import { CreateUtilityDto, UpdateUtilityDto } from './dtos';
import { UtilityService } from './utility.service';

@Controller('utilities')
export class UtilityController {
  constructor(private readonly service: UtilityService) {}

  @Get('/')
  @HttpCode(HttpStatus.OK)
  @Authorize([UserRoles.Admin, UserRoles.Staff])
  async getUtilities() {
    return await this.service.findAll();
  }

  @Get('/:id')
  @HttpCode(HttpStatus.OK)
  @Authorize([UserRoles.Admin, UserRoles.Staff])
  async getUtility(@Param('id') id: string) {
    return await this.service.findOne(+id);
  }

  @Patch('/:id')
  @HttpCode(HttpStatus.OK)
  @Authorize([UserRoles.Admin, UserRoles.Staff])
  async updateUtility(
    @Param('id') id: string,
    @Body() params: UpdateUtilityDto,
  ) {
    return await this.service.update(+id, params);
  }

  @Post('/')
  @HttpCode(HttpStatus.CREATED)
  @Authorize([UserRoles.Admin, UserRoles.Staff])
  async createUtility(@Body() params: CreateUtilityDto) {
    return await this.service.create(params);
  }

  @Delete('/:id')
  @HttpCode(HttpStatus.OK)
  @Authorize([UserRoles.Admin, UserRoles.Staff])
  async deleteUtility(@Param('id') id: string) {
    return await this.service.delete(+id);
  }
}
