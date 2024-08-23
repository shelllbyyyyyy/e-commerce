import { Transform } from 'class-transformer';
import { IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateProductVariantDTO {
  @IsNumber()
  @Transform(({ value }: { value: string }) => parseInt(value))
  @IsOptional()
  readonly price: number;

  @IsString()
  @IsOptional()
  readonly imageUrl: string;

  @IsString()
  @IsOptional()
  readonly sku: string;

  @IsString()
  @IsOptional()
  readonly label: string;
}
