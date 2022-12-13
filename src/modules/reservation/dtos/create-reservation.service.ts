import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateReservationDto {
  @IsNotEmpty()
  @IsNumber()
  readonly facilityId: number;

  @IsNotEmpty()
  @IsNumber()
  readonly tenantId: number;

  @IsNotEmpty()
  @IsString()
  readonly startDate: string;

  @IsNotEmpty()
  @IsString()
  readonly endDate: string;
}
