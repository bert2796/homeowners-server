import { UserRoles } from '@prisma/client';
import { S3 } from 'aws-sdk';

export type Config = {
  [key: string]: string | number | boolean;
};

export type SpaceConfig = {
  credentials: {
    accessKeyId: string;
    secretAccessKey: string;
  };
  endpoint: string;
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

export type SpaceObject = S3.Object & {
  Location: string;
};

export type LeaseUtilityChargeParams = {
  utilityId: number;
  amount: string;
};
