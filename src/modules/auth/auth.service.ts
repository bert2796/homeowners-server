import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserRoles } from '@prisma/client';

import { TokenPayload } from '../../commons/types';
import { isSamePassword } from '../../commons/utils';
import { UserService } from '../user/user.service';
import { LoginAuthDto } from './dtos';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async validateCredential(params: { username: string; password: string }) {
    const { username, password } = params;

    const user = await this.userService.findOneByEmailOrUsername({
      email: username,
      username,
    });
    if (!user) {
      throw new HttpException('User does not exist.', HttpStatus.BAD_REQUEST);
    }

    const hasSamePassword = await isSamePassword({
      passwordToCompare: password,
      signedPassword: user.password,
    });
    if (!hasSamePassword) {
      throw new HttpException('User does not exist.', HttpStatus.BAD_REQUEST);
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password: userPassword, ...userDetails } = user;

    return userDetails;
  }

  async validateToken(params: { token: string; roles?: UserRoles[] }) {
    const { token, roles } = params;

    let payload: TokenPayload;

    try {
      payload = this.jwtService.decode(token) as TokenPayload;

      if (!payload) {
        throw new Error();
      }
    } catch (error) {
      throw new HttpException('Unauthorized.', HttpStatus.UNAUTHORIZED);
    }

    const user = await this.userService.findOne(payload.userId);
    if (!user) {
      throw new HttpException('Unauthorized.', HttpStatus.UNAUTHORIZED);
    } else if (roles?.length && !roles.includes(payload.role)) {
      throw new HttpException('Forbidden.', HttpStatus.FORBIDDEN);
    }

    return user;
  }

  async login(params: LoginAuthDto) {
    const user = await this.validateCredential(params);
    const payload: TokenPayload = {
      role: user.role,
      userId: user.id,
    };

    return {
      accessToken: await this.jwtService.signAsync(payload),
    };
  }
}
