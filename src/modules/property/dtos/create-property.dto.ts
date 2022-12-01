import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreatePropertyDto {
  @IsNotEmpty()
  @IsNumber()
  readonly propertyTypeId: number;

  @IsNotEmpty()
  @IsNumber()
  readonly propertyLocationBlockId: number;

  @IsNotEmpty()
  @IsNumber()
  readonly propertyLocationPhaseId: number;

  @IsNotEmpty()
  @IsString()
  readonly name: string;

  @IsNotEmpty()
  @IsString()
  readonly code: string;

  @IsNotEmpty()
  @IsString()
  readonly location: string;

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
