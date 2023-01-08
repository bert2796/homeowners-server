import { IsNotEmpty, IsString } from 'class-validator';

export class CreateReservationDto {
  @IsNotEmpty()
  @IsString()
  readonly facilityId: string;

  @IsNotEmpty()
  @IsString()
  readonly tenantId: string;

  @IsNotEmpty()
  @IsString()
  readonly startDate: string;

  @IsNotEmpty()
  @IsString()
  readonly endDate: string;

  @IsNotEmpty()
  @IsString()
  readonly amount: string;
}
