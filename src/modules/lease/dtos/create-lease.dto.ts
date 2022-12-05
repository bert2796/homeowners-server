import { Type } from 'class-transformer';
import {
  ArrayMinSize,
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';

import { ExtraChargeDto } from './extra-charge.dto';
import { UtilityChargeDto } from './utility-charge.dto';

export class CreateLeaseDto {
  @IsNotEmpty()
  @IsNumber()
  readonly propertyId: number;

  @IsNotEmpty()
  @IsNumber()
  readonly tenantId: number;

  @IsArray()
  @ValidateNested({ each: true })
  @ArrayMinSize(1)
  @Type(() => UtilityChargeDto)
  readonly utilityCharges: UtilityChargeDto[];

  @IsArray()
  @ValidateNested({ each: true })
  @ArrayMinSize(1)
  @Type(() => ExtraChargeDto)
  readonly extraCharges: ExtraChargeDto[];

  @IsOptional()
  @IsString()
  readonly rentalAmount?: string;

  @IsNotEmpty()
  @IsString()
  readonly date: string;
}
