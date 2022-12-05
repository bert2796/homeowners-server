import { IsOptional, IsString } from 'class-validator';

export class UpdatePropertySettingDto {
  @IsOptional()
  @IsString()
  readonly name: string;

  @IsOptional()
  @IsString()
  readonly display: string;

  @IsOptional()
  @IsString()
  readonly description: string;
}
