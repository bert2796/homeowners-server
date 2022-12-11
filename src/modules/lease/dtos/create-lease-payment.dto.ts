import { IsNotEmpty, IsString } from 'class-validator';

export class CreateLeasePaymentDto {
  @IsNotEmpty()
  @IsString()
  readonly leaseId: string;

  @IsNotEmpty()
  @IsString()
  readonly amount: string;
}
