import { PrismaClient } from '@prisma/client';

import { SeederStrategy } from './interface';

export class CreatePropertyLocationPhase implements SeederStrategy {
  async seed(prisma: PrismaClient) {
    await prisma.propertyLocationPhase.upsert({
      create: {
        display: 'Phase One (1)',
        name: 'phase-one',
      },
      update: {},
      where: { name: 'phase-one' },
    });

    await prisma.propertyLocationPhase.upsert({
      create: {
        display: 'Phase Two (2)',
        name: 'phase-two',
      },
      update: {},
      where: { name: 'phase-two' },
    });

    await prisma.propertyLocationPhase.upsert({
      create: {
        display: 'Phase Three (3)',
        name: 'phase-three',
      },
      update: {},
      where: { name: 'phase-three' },
    });

    await prisma.propertyLocationPhase.upsert({
      create: {
        display: 'Phase Four (4)',
        name: 'phase-four',
      },
      update: {},
      where: { name: 'phase-four' },
    });
  }
}
