import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

import { PrismaService } from '../prisma/prisma.service';
import { CreateAnnouncementDto, UpdateAnnouncementDto } from './dtos';

@Injectable()
export class AnnouncementService {
  constructor(private readonly prisma: PrismaService) {}

  private model = this.prisma.announcement;
  private findFirst = this.model.findFirst;
  private findMany = this.model.findMany;
  private findUnique = this.model.findUnique;

  async findOneOrThrow(id: number) {
    const announcement = await this.findUnique({ where: { id } });
    if (!announcement) {
      throw new HttpException(
        'Announcement does not exist.',
        HttpStatus.BAD_REQUEST,
      );
    }

    return announcement;
  }

  async findAll() {
    return await this.findMany();
  }

  async findOne(id: number) {
    return await this.findOneOrThrow(id);
  }

  async create(params: CreateAnnouncementDto) {
    return await this.model.create({ data: params });
  }

  async update(id: number, params: UpdateAnnouncementDto) {
    await this.findOneOrThrow(id);

    return await this.model.update({
      data: params,
      where: { id },
    });
  }

  async delete(id: number) {
    await this.findOneOrThrow(id);

    return await this.model.delete({ where: { id } });
  }
}
