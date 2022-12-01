import { PrismaClient } from '@prisma/client';
import { config } from 'dotenv';

import { SeedersContext } from './context';

const prisma = new PrismaClient();
const seedersContext = new SeedersContext(prisma);

(() => {
  config();

  seedersContext
    .process()
    .catch((e) => console.log(e))
    .finally(async () => await prisma.$disconnect());
})();
