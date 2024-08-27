import { Transform } from 'class-transformer';
import { IsArray, IsNumber, IsString } from 'class-validator';

export class CreateOrderDTO {
  @IsArray()
  @IsString({ each: true })
  readonly productId: string[];

  @IsNumber()
  @Transform(({ value }) => parseInt(value))
  readonly quantity: number;
}
