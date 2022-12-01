import { UserRoles } from '@prisma/client';
import { IsEmail, IsEnum, IsOptional, IsString } from 'class-validator';

export class UpdateUserDto {
  @IsOptional()
  @IsString()
  readonly firstName: string;

  @IsOptional()
  @IsString()
  readonly middleName?: string;

  @IsOptional()
  @IsString()
  readonly lastName: string;

  @IsOptional()
  @IsEmail()
  readonly email: string;

  @IsOptional()
  @IsString()
  readonly username: string;

  @IsOptional()
  @IsString()
  readonly password: string;

  @IsOptional()
  @IsEnum(UserRoles)
  readonly role?: UserRoles;
}
