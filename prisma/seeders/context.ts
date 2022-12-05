import { PrismaClient } from '@prisma/client';

import { CreateExtra } from './strategies/create-extra.strategy';
import { CreatePropertyLocationBlock } from './strategies/create-property-location-block.strategy';
import { CreatePropertyLocationPhase } from './strategies/create-property-location-phase.strategy';
import { CreatePropertyType } from './strategies/create-property-type.strategy';
import { CreateUserStrategy } from './strategies/create-user.strategy';
import { CreateUtility } from './strategies/create-utility.strategy';
import { SeederStrategy } from './strategies/interface';

export class SeedersContext {
  private strategies: SeederStrategy[];
  private prisma: PrismaClient;

  constructor(prisma: PrismaClient) {
    this.prisma = prisma;
    this.strategies = [
      new CreateUserStrategy(),
      new CreatePropertyType(),
      new CreatePropertyLocationBlock(),
      new CreatePropertyLocationPhase(),
      new CreateUtility(),
      new CreateExtra(),
    ];
  }

  async process() {
    for (const strategy of this.strategies) {
      await strategy.seed(this.prisma);
    }
  }
}
