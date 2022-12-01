import { faker } from '@faker-js/faker';
import { PrismaClient, UserRoles } from '@prisma/client';
import { genSalt, hash } from 'bcrypt';

import { SeederStrategy } from './interface';

export class CreateUserStrategy implements SeederStrategy {
  async seed(prisma: PrismaClient) {
    await prisma.user.upsert({
      create: {
        email: 'user+admin@gmail.com',
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
        password: await hash('User123!', await genSalt()),
        role: UserRoles.Admin,
        username: 'user-admin',
      },
      update: {
        password: await hash('User123!', await genSalt()),
      },
      where: { email: 'user+admin@gmail.com' },
    });
  }
}
