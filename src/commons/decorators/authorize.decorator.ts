import { CustomDecorator, SetMetadata } from '@nestjs/common';
import { UserRoles } from '@prisma/client';

export const Authorize = (roles?: UserRoles[]): CustomDecorator<string> =>
  SetMetadata('authorize', { roles });
