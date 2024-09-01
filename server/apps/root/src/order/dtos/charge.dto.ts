import {
  BankTransferMethod,
  PaymentMethod,
} from '@libs/domain/billing/entities/billing';
import { IsEnum, IsOptional, IsString, ValidateNested } from 'class-validator';

export class ChargeDTO {
  @IsEnum(PaymentMethod)
  @IsString()
  readonly payment_method: PaymentMethod;

  @IsEnum(BankTransferMethod)
  @IsString()
  @IsOptional()
  readonly transfer_method?: BankTransferMethod;

  @IsString()
  readonly orderId: string;

  @IsString()
  readonly addressId: string;
}
