import { Prisma } from '@prisma/client';
import * as bcrypt from 'bcrypt';

export const UserEventHandler =
  () =>
  async (
    params: Prisma.MiddlewareParams,
    next: (params: Prisma.MiddlewareParams) => Promise<any>,
  ) => {
    if (params.model === 'User') {
      if (params.action === 'create' || params.action === 'update') {
        // check if password is in data
        if (params.args.data?.password) {
          const password = await bcrypt.hash(
            params.args.data.password,
            await bcrypt.genSalt(),
          );

          // replace password
          params.args.data = { ...params.args.data, password };
        }
      }
    }

    return next(params);
  };
