import { IsOptional, IsString } from 'class-validator';

export class UpdateAnnouncementDto {
  @IsOptional()
  @IsString()
  readonly title: string;

  @IsOptional()
  @IsString()
  readonly description: string;

  @IsOptional()
  @IsString()
  readonly location: string;

  @IsOptional()
  @IsString()
  readonly startDate?: string;

  @IsOptional()
  @IsString()
  readonly endDate?: string;
}
