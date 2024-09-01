import { IsString, IsNumber, IsDateString } from 'class-validator';

export class MidtransNotificationDto {
  @IsDateString()
  transaction_time: string;

  @IsString()
  transaction_status: string;

  @IsString()
  transaction_id: string;

  @IsString()
  status_message: string;

  @IsString()
  status_code: string;

  @IsString()
  signature_key: string;

  @IsDateString()
  settlement_time: string;

  @IsString()
  payment_type: string;

  @IsString()
  order_id: string;

  @IsString()
  merchant_id: string;

  @IsString()
  gross_amount: string;

  @IsString()
  fraud_status: string;

  @IsString()
  currency: string;
}
