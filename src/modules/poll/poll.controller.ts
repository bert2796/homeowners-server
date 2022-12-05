import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
} from '@nestjs/common';
import { UserRoles } from '@prisma/client';

import { Authorize } from '../../commons/decorators/authorize.decorator';
import { CreatePollDto } from './dtos';
import { PollService } from './poll.service';

@Controller('polls')
export class PollController {
  constructor(private readonly service: PollService) {}

  @Get('/')
  @HttpCode(HttpStatus.OK)
  @Authorize()
  async getPolls() {
    return await this.service.findAll();
  }

  @Get('/:id')
  @HttpCode(HttpStatus.OK)
  @Authorize()
  async getPoll(@Param('id') id: string) {
    return await this.service.findOne(+id);
  }

  @Post('/')
  @HttpCode(HttpStatus.CREATED)
  @Authorize([UserRoles.Admin, UserRoles.Staff])
  async createPoll(@Body() params: CreatePollDto) {
    return await this.service.create(params);
  }

  @Delete('/:id')
  @HttpCode(HttpStatus.OK)
  @Authorize([UserRoles.Admin, UserRoles.Staff])
  async deletePoll(@Param('id') id: string) {
    return await this.service.delete(+id);
  }
}
