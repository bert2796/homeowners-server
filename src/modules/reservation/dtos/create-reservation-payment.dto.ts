import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateReservationPaymentDto {
  @IsNotEmpty()
  @IsNumber()
  readonly reservationId: number;

  @IsNotEmpty()
  @IsString()
  readonly amount: string;
}
