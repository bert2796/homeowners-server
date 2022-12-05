import { IsNotEmpty, IsString } from 'class-validator';

export class CreateFacilityDto {
  @IsNotEmpty()
  @IsString()
  readonly name: string;

  @IsNotEmpty()
  @IsString()
  readonly description: string;
}
