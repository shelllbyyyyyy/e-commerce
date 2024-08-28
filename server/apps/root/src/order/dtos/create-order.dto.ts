import { Transform } from 'class-transformer';
import { IsArray, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateOrderDTO {
  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  readonly cartItemId?: string[];

  @IsString()
  @IsOptional()
  readonly productId?: string;

  @IsNumber()
  @Transform(({ value }) => parseInt(value))
  @IsOptional()
  readonly quantity?: number;
}
