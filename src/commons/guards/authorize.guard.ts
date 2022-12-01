import {
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
  Logger,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { UserRoles } from '@prisma/client';
import { Request } from 'express';

import { AuthService } from '../../modules/auth/auth.service';

@Injectable()
export class AuthorizeGuard implements CanActivate {
  private readonly logger = new Logger(AuthorizeGuard.name);

  constructor(
    private readonly reflector: Reflector,
    private readonly authService: AuthService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const authorize = this.reflector.get<{ roles?: UserRoles[] }>(
      'authorize',
      context.getHandler(),
    );
    if (!authorize) {
      return true;
    }

    const ctx = context.switchToHttp();
    const request = ctx.getRequest<Request>();
    const { headers } = request;
    if (
      !headers?.authorization ||
      headers.authorization.split(' ')[0] !== 'Bearer'
    ) {
      throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);
    }

    const token = headers.authorization.split(' ')[1];
    const user = await this.authService.validateToken({
      roles: authorize?.roles || [],
      token,
    });

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (request as any).user = user;

    return true;
  }
}
