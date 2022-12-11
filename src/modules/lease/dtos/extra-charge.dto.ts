import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class ExtraChargeDto {
  @IsNotEmpty()
  @IsNumber()
  readonly id: number;

  @IsNotEmpty()
  @IsString()
  readonly amount: string;
}
