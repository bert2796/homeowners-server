import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateAnnouncementDto {
  @IsNotEmpty()
  @IsString()
  readonly title: string;

  @IsNotEmpty()
  @IsString()
  readonly description: string;

  @IsOptional()
  @IsString()
  readonly location?: string;

  @IsOptional()
  @IsString()
  readonly startDate?: string;

  @IsOptional()
  @IsString()
  readonly endDate?: string;
}
