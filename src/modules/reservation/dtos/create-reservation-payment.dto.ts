import { IsNotEmpty, IsString } from 'class-validator';

export class CreateReservationPaymentDto {
  @IsNotEmpty()
  @IsString()
  readonly reservationId: string;

  @IsNotEmpty()
  @IsString()
  readonly amount: string;
}
