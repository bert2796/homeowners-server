import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';

import { PrismaService } from '../prisma/prisma.service';
import { CreateExtraDto, UpdateExtraDto } from './dtos';

@Injectable()
export class ExtraService {
  constructor(private readonly prisma: PrismaService) {}

  private model = this.prisma.extra;
  private findFirst = this.model.findFirst;
  private findMany = this.model.findMany;
  private findUnique = this.model.findUnique;

  async findOneOrThrow(id: number) {
    const extra = await this.findUnique({ where: { id } });
    if (!extra) {
      throw new HttpException('Extra does not exist.', HttpStatus.BAD_REQUEST);
    }

    return extra;
  }

  async findAll() {
    return await this.findMany();
  }

  async findOne(id: number) {
    return await this.findOneOrThrow(id);
  }

  async create(params: CreateExtraDto) {
    try {
      return await this.model.create({ data: params });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new HttpException(
            `Extra charge with name ${params.name} is already existing`,
            HttpStatus.BAD_REQUEST,
          );
        }
      }
    }
  }

  async update(id: number, params: UpdateExtraDto) {
    await this.findOneOrThrow(id);

    return await this.model.update({
      data: params,
      where: { id },
    });
  }

  async delete(id: number) {
    await this.findOneOrThrow(id);

    return await this.model.deleteMany({ where: { id } });
  }
}
