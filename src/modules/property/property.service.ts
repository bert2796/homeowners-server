import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Prisma, Property } from '@prisma/client';
import { createPaginator } from 'prisma-pagination';

import { PaginateParams } from '../../commons/types';
import { PrismaService } from '../prisma/prisma.service';
import { CreatePropertyDto, UpdatePropertyDto } from './dtos';
import { PropertyLocationBlockService } from './property-location-block.service';
import { PropertyLocationPhaseService } from './property-location-phase.service';
import { PropertyTypeService } from './property-type.service';

@Injectable()
export class PropertyService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly propertyTypeService: PropertyTypeService,
    private readonly propertyBlockService: PropertyLocationBlockService,
    private readonly propertyPhaseService: PropertyLocationPhaseService,
  ) {}

  private model = this.prisma.property;
  private findFirst = this.model.findFirst;
  private findMany = this.model.findMany;
  private findUnique = this.model.findUnique;

  private async validateRelation(
    params: CreatePropertyDto | UpdatePropertyDto,
  ) {
    await this.propertyTypeService.findOneOrThrow(params.propertyTypeId);

    await this.propertyBlockService.findOneOrThrow(
      params.propertyLocationBlockId,
    );

    await this.propertyPhaseService.findOneOrThrow(
      params.propertyLocationPhaseId,
    );
  }

  async findOneOrThrow(id: number) {
    const property = await this.findUnique({ where: { id } });
    if (!property) {
      throw new HttpException(
        'Property does not exist.',
        HttpStatus.BAD_REQUEST,
      );
    }

    return property;
  }

  async findOne(id: number) {
    const property = await this.findUnique({
      include: {
        propertyLocationBlock: true,
        propertyLocationPhase: true,
        propertyType: true,
      },
      where: { id },
    });
    if (!property) {
      throw new HttpException(
        'Property does not exist.',
        HttpStatus.BAD_REQUEST,
      );
    }

    return property;
  }

  async findAll() {
    return await this.findMany({
      include: {
        propertyLocationBlock: true,
        propertyLocationPhase: true,
        propertyType: true,
      },
    });
  }

  async paginate(params: PaginateParams) {
    const paginate = createPaginator({
      page: params.page,
      perPage: params.take,
    });

    const result = await paginate<Property, Prisma.PropertyFindManyArgs>(
      this.prisma.property,
      {
        include: { propertyType: true },
        orderBy: { id: 'desc' },
        ...(params?.search && {
          where: {
            OR: [
              { code: { contains: params.search } },
              { name: { contains: params.search } },
            ],
          },
        }),
      },
    );

    return result;
  }

  async create(params: CreatePropertyDto) {
    await this.validateRelation(params);

    try {
      return await this.model.create({ data: params });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new HttpException(
            `Property with code ${params.code} is already existing`,
            HttpStatus.BAD_REQUEST,
          );
        }
      }
    }
  }

  async update(id: number, params: UpdatePropertyDto) {
    await this.findOneOrThrow(id);
    await this.validateRelation(params);

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
