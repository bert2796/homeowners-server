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
import { AnnouncementService } from './announcement.service';
import { CreateAnnouncementDto, UpdateAnnouncementDto } from './dtos';

@Controller('announcements')
export class AnnouncementController {
  constructor(private readonly service: AnnouncementService) {}

  @Get('/')
  @HttpCode(HttpStatus.OK)
  @Authorize()
  async getAnnouncements() {
    return await this.service.findAll();
  }

  @Get('/:id')
  @HttpCode(HttpStatus.OK)
  @Authorize()
  async getAnnouncement(@Param('id') id: string) {
    return await this.service.findOne(+id);
  }

  @Patch('/:id')
  @HttpCode(HttpStatus.OK)
  @Authorize([UserRoles.Admin, UserRoles.Staff])
  async updateAnnouncement(
    @Param('id') id: string,
    @Body() params: UpdateAnnouncementDto,
  ) {
    return await this.service.update(+id, params);
  }

  @Post('/')
  @HttpCode(HttpStatus.ACCEPTED)
  @Authorize([UserRoles.Admin, UserRoles.Staff])
  async createAnnouncement(@Body() params: CreateAnnouncementDto) {
    return await this.service.create(params);
  }

  @Delete('/:id')
  @HttpCode(HttpStatus.OK)
  @Authorize([UserRoles.Admin, UserRoles.Staff])
  async deleteAnnouncement(@Param('id') id: string) {
    return await this.service.delete(+id);
  }
}
