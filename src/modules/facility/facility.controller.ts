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
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { UserRoles } from '@prisma/client';

import { Authorize } from '../../commons/decorators/authorize.decorator';
import { CreateFacilityDto, UpdateFacilityDto } from './dtos';
import { FacilityService } from './facility.service';

@Controller('facilities')
export class FacilityController {
  constructor(private readonly service: FacilityService) {}

  @Get('/')
  @HttpCode(HttpStatus.OK)
  @Authorize()
  async getFacilities() {
    return await this.service.findAll();
  }

  @Get('/:id')
  @HttpCode(HttpStatus.OK)
  @Authorize()
  async getAnnouncement(@Param('id') id: string) {
    return await this.service.findOne(+id);
  }

  @Patch('/:id')
  @UseInterceptors(FilesInterceptor('images'))
  @HttpCode(HttpStatus.OK)
  @Authorize([UserRoles.Admin, UserRoles.Staff])
  async updateAnnouncement(
    @Param('id') id: string,
    @Body() params: UpdateFacilityDto,
    @UploadedFiles() images: Express.Multer.File[],
  ) {
    return await this.service.update(+id, params, images);
  }

  @Post('/')
  @UseInterceptors(FilesInterceptor('images'))
  @HttpCode(HttpStatus.CREATED)
  @Authorize([UserRoles.Admin, UserRoles.Staff])
  async createAnnouncement(
    @Body() params: CreateFacilityDto,
    @UploadedFiles() images: Express.Multer.File[],
  ) {
    return await this.service.create(params, images);
  }

  @Delete('/:id')
  @HttpCode(HttpStatus.OK)
  @Authorize([UserRoles.Admin, UserRoles.Staff])
  async deleteAnnouncement(@Param('id') id: string) {
    return await this.service.delete(+id);
  }
}
