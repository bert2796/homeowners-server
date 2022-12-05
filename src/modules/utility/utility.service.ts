import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';

import { PrismaService } from '../prisma/prisma.service';
import { CreateUtilityDto, UpdateUtilityDto } from './dtos';

@Injectable()
export class UtilityService {
  constructor(private readonly prisma: PrismaService) {}

  private model = this.prisma.utility;
  private findFirst = this.model.findFirst;
  private findMany = this.model.findMany;
  private findUnique = this.model.findUnique;

  async findOneOrThrow(id: number) {
    const utility = await this.findUnique({ where: { id } });
    if (!utility) {
      throw new HttpException(
        'Utility does not exist.',
        HttpStatus.BAD_REQUEST,
      );
    }

    return utility;
  }

  async findAll() {
    return await this.findMany();
  }

  async findOne(id: number) {
    return await this.findOneOrThrow(id);
  }

  async create(params: CreateUtilityDto) {
    try {
      return await this.model.create({ data: params });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new HttpException(
            `Property type with name ${params.name} is already existing`,
            HttpStatus.BAD_REQUEST,
          );
        }
      }
    }
  }

  async update(id: number, params: UpdateUtilityDto) {
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
