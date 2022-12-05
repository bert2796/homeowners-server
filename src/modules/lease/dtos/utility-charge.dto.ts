import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class UtilityChargeDto {
  @IsNotEmpty()
  @IsNumber()
  readonly utilityId: number;

  @IsNotEmpty()
  @IsString()
  readonly amount: string;
}
