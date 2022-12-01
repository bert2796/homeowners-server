import { Injectable } from '@nestjs/common';

import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class PropertyLocationBlockService {
  constructor(private readonly prisma: PrismaService) {}

  private model = this.prisma.propertyLocationBlock;
  private findFirst = this.model.findFirst;
  private findMany = this.model.findMany;
  private findUnique = this.model.findUnique;

  async findAll() {
    return await this.findMany();
  }

  async findOne(id: number) {
    return await this.findUnique({ where: { id } });
  }
}
