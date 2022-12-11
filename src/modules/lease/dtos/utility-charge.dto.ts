import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class UtilityChargeDto {
  @IsNotEmpty()
  @IsNumber()
  readonly id: number;

  @IsNotEmpty()
  @IsString()
  readonly amount: string;
}
