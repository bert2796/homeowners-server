import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';

import { PrismaService } from '../prisma/prisma.service';
import { CreatePropertySettingDto, UpdatePropertySettingDto } from './dtos';

@Injectable()
export class PropertyLocationLotService {
  constructor(private readonly prisma: PrismaService) {}

  private model = this.prisma.propertyLocationLot;
  private findFirst = this.model.findFirst;
  private findMany = this.model.findMany;
  private findUnique = this.model.findUnique;

  async findOneOrThrow(id: number) {
    const propertyLot = await this.findUnique({ where: { id } });
    if (!propertyLot) {
      throw new HttpException(
        'Property location lot not exist.',
        HttpStatus.BAD_REQUEST,
      );
    }

    return propertyLot;
  }

  async findAll() {
    return await this.findMany();
  }

  async findOne(id: number) {
    return await this.findOneOrThrow(id);
  }

  async create(params: CreatePropertySettingDto) {
    try {
      return await this.model.create({ data: params });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new HttpException(
            `Property location lot with name ${params.name} is already existing`,
            HttpStatus.BAD_REQUEST,
          );
        }
      }
    }
  }

  async update(id: number, params: UpdatePropertySettingDto) {
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
