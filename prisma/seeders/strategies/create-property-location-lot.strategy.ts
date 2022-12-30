import { PrismaClient } from '@prisma/client';

import { SeederStrategy } from './interface';

export class CreatePropertyLocationLot implements SeederStrategy {
  async seed(prisma: PrismaClient) {
    await prisma.propertyLocationLot.upsert({
      create: {
        display: 'Lot One (1)',
        name: 'lot-one',
      },
      update: {},
      where: { name: 'lot-one' },
    });

    await prisma.propertyLocationLot.upsert({
      create: {
        display: 'Lot Two (2)',
        name: 'lot-two',
      },
      update: {},
      where: { name: 'lot-two' },
    });

    await prisma.propertyLocationLot.upsert({
      create: {
        display: 'Lot Three (3)',
        name: 'lot-three',
      },
      update: {},
      where: { name: 'lot-three' },
    });

    await prisma.propertyLocationLot.upsert({
      create: {
        display: 'Lot Four (4)',
        name: 'lot-four',
      },
      update: {},
      where: { name: 'lot-four' },
    });
  }
}
