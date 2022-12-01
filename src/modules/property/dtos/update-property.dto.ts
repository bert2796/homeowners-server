import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdatePropertyDto {
  @IsOptional()
  @IsNumber()
  readonly propertyTypeId?: number;

  @IsOptional()
  @IsNumber()
  readonly propertyLocationBlockId?: number;

  @IsOptional()
  @IsNumber()
  readonly propertyLocationPhaseId?: number;

  @IsOptional()
  @IsString()
  readonly name?: string;

  @IsOptional()
  @IsString()
  readonly code?: string;

  @IsOptional()
  @IsString()
  readonly location?: string;

  @IsOptional()
  @IsString()
  readonly description?: string;

  @IsNotEmpty()
  @IsString()
  readonly amount: string;

  @IsOptional()
  @IsNumber()
  readonly bedrooms?: number;

  @IsOptional()
  @IsNumber()
  readonly bathrooms?: number;
}
