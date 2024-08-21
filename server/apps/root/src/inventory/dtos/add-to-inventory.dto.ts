import { Transform } from 'class-transformer';
import { IsNumber } from 'class-validator';

export class AddToInventoryDTO {
  @IsNumber()
  @Transform(({ value }) => parseInt(value))
  readonly quantity: number;
}
