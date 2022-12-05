import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class ExtraChargeDto {
  @IsNotEmpty()
  @IsNumber()
  readonly extraId: number;

  @IsNotEmpty()
  @IsString()
  readonly amount: string;
}
