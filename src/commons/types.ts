import { UserRoles } from '@prisma/client';

export type Config = {
  [key: string]: string | number | boolean;
};

export type TokenPayload = {
  userId: number;
  role: UserRoles;
};

export type PaginateParams = {
  take: number;
  page: number;
  search?: string;
};
