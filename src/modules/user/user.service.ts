import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { User } from '@prisma/client';

import { PrismaService } from '../prisma/prisma.service';
import { CreateUserDto, UpdateUserDto } from './dtos';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  private model = this.prisma.user;
  private findFirst = this.prisma.user.findFirst;
  private findMany = this.prisma.user.findMany;
  private findUnique = this.prisma.user.findUnique;

  private exclude<User, Key extends keyof User>(user: User, keys: Key[]) {
    for (const key of keys) {
      delete user[key];
    }
    return user;
  }

  async findOneOrThrow(id: number) {
    const user = await this.findOne(id);
    if (!user) {
      throw new HttpException('User does not exist.', HttpStatus.BAD_REQUEST);
    }
  }

  async create(params: CreateUserDto) {
    const user = await this.findOneByEmailOrUsername({
      email: params.email,
      username: params.username,
    });
    if (user) {
      throw new HttpException(
        'User is already existing.',
        HttpStatus.BAD_REQUEST,
      );
    }

    const createdUser = await this.prisma.$transaction(async (tx) => {
      // create user data
      const createdUser = await tx.user.create({
        data: params,
      });

      // create home owner data
      // if (params.role === UserRoles.Homeowner) {
      // }

      return createdUser;
    });

    return this.exclude(createdUser, ['password']);
  }

  async update(id: number, params: UpdateUserDto) {
    await this.findOneOrThrow(id);

    const updatedUser = await this.model.update({
      data: params,
      where: { id },
    });

    return this.exclude(updatedUser, ['password']);
  }

  async delete(id: number) {
    await this.findOneOrThrow(id);

    const deletedUser = await this.model.delete({ where: { id } });

    return this.exclude(deletedUser, ['password']);
  }

  async findAll(params?: { where?: Partial<User> }) {
    const users = await this.findMany(params);

    return users.map((user) => this.exclude(user, ['password']));
  }

  async findOne(id: number) {
    const user = await this.findUnique({
      where: { id },
    });

    return this.exclude(user, ['password']);
  }

  async findOneByEmailOrUsername(params: { username: string; email: string }) {
    return await this.findFirst({
      where: { OR: [{ email: params.email }, { username: params.username }] },
    });
  }
}
