import { PrismaClient } from '@prisma/client';

import { SeederStrategy } from './interface';

export class CreatePropertyType implements SeederStrategy {
  async seed(prisma: PrismaClient) {
    await prisma.propertyType.upsert({
      create: {
        display: 'Single-Family',
        name: 'single-family',
      },
      update: {},
      where: { name: 'single-family' },
    });

    await prisma.propertyType.upsert({
      create: {
        display: 'Bungalow',
        name: 'bungalow',
      },
      update: {},
      where: { name: 'bungalow' },
    });

    await prisma.propertyType.upsert({
      create: {
        display: 'Ranch',
        name: 'ranch',
      },
      update: {},
      where: { name: 'ranch' },
    });

    await prisma.propertyType.upsert({
      create: {
        display: 'Apartment',
        name: 'apartment',
      },
      update: {},
      where: { name: 'apartment' },
    });
  }
}
