import { IsOptional, IsString } from 'class-validator';

export class UpdateFacilityDto {
  @IsOptional()
  @IsString()
  readonly name: string;

  @IsOptional()
  @IsString()
  readonly description: string;
}
