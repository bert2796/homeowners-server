import { FacilityPaymentTypes } from '@prisma/client';
import { IsEnum, IsOptional, IsString } from 'class-validator';

export class UpdateFacilityDto {
  @IsOptional()
  @IsString()
  readonly name: string;

  @IsOptional()
  @IsString()
  readonly description: string;

  @IsOptional()
  @IsEnum(FacilityPaymentTypes)
  readonly type: FacilityPaymentTypes;

  @IsOptional()
  @IsString()
  readonly amount: string;

  @IsOptional()
  @IsString()
  readonly downPayment?: string;
}
