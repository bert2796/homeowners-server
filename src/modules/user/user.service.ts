import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { User } from '@prisma/client';

import { isSamePassword } from '../../commons/utils';
import { PrismaService } from '../prisma/prisma.service';
import { SpaceDriveService } from '../space-drive/space-drive.service';
import { CreateUserDto, UpdatePasswordUserDto, UpdateUserDto } from './dtos';

@Injectable()
export class UserService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly spaceDriveService: SpaceDriveService,
  ) {}

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

  private async uploadAvatar(image: Express.Multer.File, user: User) {
    // delete folder first
    await this.spaceDriveService.deleteFolder({
      bucket: 'homeowners',
      prefix: `avatar/${user.id}/`,
    });

    // upload new avatar
    const fileExtension = image.mimetype.split('/')?.[1] || 'jpeg';
    const uploadImage = await this.spaceDriveService.uploadFile({
      bucket: `homeowners/avatar/${user.id}`,
      file: image,
      name: `avatar.${fileExtension}`,
    });

    return uploadImage.Location;
  }

  async findOneOrThrow(id: number) {
    const user = await this.findUnique({ where: { id } });
    if (!user) {
      throw new HttpException('User does not exist.', HttpStatus.BAD_REQUEST);
    }

    return user;
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

  async update(id: number, params: UpdateUserDto, file?: Express.Multer.File) {
    const user = await this.findOneOrThrow(id);
    let avatarUrl = '';

    if (file) {
      avatarUrl = await this.uploadAvatar(file, user);
    }

    const updatedUser = await this.model.update({
      data: { ...params, ...(avatarUrl && { avatar: avatarUrl }) },
      where: { id },
    });

    return this.exclude(updatedUser, ['password']);
  }

  async updatePassword(id: number, params: UpdatePasswordUserDto) {
    const user = await this.findOneOrThrow(id);

    const hasSamePassword = await isSamePassword({
      passwordToCompare: params.currentPassword,
      signedPassword: user.password,
    });
    if (!hasSamePassword) {
      throw new HttpException('Invalid password', HttpStatus.BAD_REQUEST);
    }

    const updatedUser = await this.model.update({
      data: { password: params.newPassword },
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
    const user = await this.findOneOrThrow(id);

    return this.exclude(user, ['password']);
  }

  async findOneByEmailOrUsername(params: { username: string; email: string }) {
    return await this.findFirst({
      where: { OR: [{ email: params.email }, { username: params.username }] },
    });
  }
}
