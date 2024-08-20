import { Optional } from '@nestjs/common';
import { Transform } from 'class-transformer';
import { IsNumber, IsNumberString, IsString } from 'class-validator';

export class UpdateProductVariantDTO {
  @IsNumber()
  @Transform(({ value }) => parseInt(value))
  @Optional()
  readonly price: number;

  @IsString()
  @Optional()
  readonly imageUrl: string;

  @IsString()
  @Optional()
  readonly sku: string;

  @IsString()
  @Optional()
  readonly label: string;
}
