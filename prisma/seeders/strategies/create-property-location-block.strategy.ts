import { PrismaClient } from '@prisma/client';

import { SeederStrategy } from './interface';

export class CreatePropertyLocationBlock implements SeederStrategy {
  async seed(prisma: PrismaClient) {
    await prisma.propertyLocationBlock.upsert({
      create: {
        display: 'Block One (1)',
        name: 'block-one',
      },
      update: {},
      where: { name: 'block-one' },
    });

    await prisma.propertyLocationBlock.upsert({
      create: {
        display: 'Block Two (2)',
        name: 'block-two',
      },
      update: {},
      where: { name: 'block-two' },
    });

    await prisma.propertyLocationBlock.upsert({
      create: {
        display: 'Block Three (3)',
        name: 'block-three',
      },
      update: {},
      where: { name: 'block-three' },
    });

    await prisma.propertyLocationBlock.upsert({
      create: {
        display: 'Block Four (4)',
        name: 'block-four',
      },
      update: {},
      where: { name: 'block-four' },
    });
  }
}
