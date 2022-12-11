import { LeasePaymentStatuses } from '@prisma/client';
import { IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class UpdateLeasePaymentDto {
  @IsNotEmpty()
  @IsEnum(LeasePaymentStatuses)
  readonly status?: LeasePaymentStatuses;

  @IsOptional()
  @IsString()
  readonly reason?: string;

  @IsOptional()
  @IsString()
  readonly otherReason?: string;

  @IsOptional()
  @IsString()
  readonly otherReasonDetails?: string;
}
