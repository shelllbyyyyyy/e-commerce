import { Transform } from 'class-transformer';
import { IsNumber } from 'class-validator';

export class UpdateCartDTO {
  @IsNumber()
  @Transform(({ value }) => parseInt(value))
  readonly quantity: number;
}
