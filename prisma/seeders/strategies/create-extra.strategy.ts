import { PrismaClient } from '@prisma/client';

import { SeederStrategy } from './interface';

export class CreateExtra implements SeederStrategy {
  async seed(prisma: PrismaClient) {
    await prisma.extra.upsert({
      create: {
        display: 'Monthly Dues',
        name: 'monthly-dues',
      },
      update: {},
      where: { name: 'monthly-dues' },
    });
  }
}
