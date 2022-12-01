import { PrismaClient } from '@prisma/client';

export interface SeederStrategy {
  seed(prisma: PrismaClient): Promise<void>;
}
