import {
  ArrayNotEmpty,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreatePollDto {
  @IsNotEmpty()
  @IsString()
  readonly title: string;

  @ArrayNotEmpty()
  @IsString({ each: true })
  readonly choices: string[];

  @IsOptional()
  @IsString()
  readonly description?: string;

  @IsOptional()
  @IsString()
  readonly endDate?: string;

  @IsOptional()
  @IsNumber()
  readonly allowedAnswer?: number;
}
