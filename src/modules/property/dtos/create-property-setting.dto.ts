import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreatePropertySettingDto {
  @IsNotEmpty()
  @IsString()
  readonly name: string;

  @IsNotEmpty()
  @IsString()
  readonly display: string;

  @IsOptional()
  @IsString()
  readonly description: string;
}
