import { PrismaClient } from '@prisma/client';

import { SeederStrategy } from './interface';

export class CreateUtility implements SeederStrategy {
  async seed(prisma: PrismaClient) {
    await prisma.utility.upsert({
      create: {
        display: 'Water',
        name: 'water',
      },
      update: {},
      where: { name: 'water' },
    });
  }
}
