import { IsNotEmpty, IsString } from 'class-validator';

export class UpdatePasswordUserDto {
  @IsNotEmpty()
  @IsString()
  readonly currentPassword: string;

  @IsNotEmpty()
  @IsString()
  readonly newPassword: string;
}
