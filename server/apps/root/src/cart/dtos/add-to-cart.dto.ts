import { Transform } from 'class-transformer';
import { IsNumber, IsString } from 'class-validator';

export class AddToCartDTO {
  @IsString()
  readonly productId: string;

  @IsNumber()
  @Transform(({ value }) => parseInt(value))
  readonly quantity: number;
}
