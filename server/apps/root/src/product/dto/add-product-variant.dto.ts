import { Transform } from 'class-transformer';
import { IsNumber, IsNumberString, IsString } from 'class-validator';

export class AddProductVariantDTO {
  @IsNumber()
  @Transform(({ value }) => parseInt(value))
  readonly price: number;

  @IsString()
  readonly imageUrl: string;

  @IsString()
  readonly sku: string;

  @IsString()
  readonly label: string;

  @IsNumber()
  @Transform(({ value }) => parseInt(value))
  readonly quantity: number;
}
