import { FacilityPaymentTypes } from '@prisma/client';
import { IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateFacilityDto {
  @IsNotEmpty()
  @IsString()
  readonly name: string;

  @IsNotEmpty()
  @IsString()
  readonly description: string;

  @IsNotEmpty()
  @IsEnum(FacilityPaymentTypes)
  readonly type: FacilityPaymentTypes;

  @IsNotEmpty()
  @IsString()
  readonly amount: string;

  @IsOptional()
  @IsString()
  readonly downPayment?: string;
}
