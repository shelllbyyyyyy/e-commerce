import { IsArray, IsNumber, IsNumberString, IsString } from 'class-validator';
import { Transform } from 'class-transformer';

export class AddProductDTO {
  @IsString()
  readonly name: string;

  @IsNumber()
  @Transform(({ value }) => parseInt(value))
  readonly price: number;

  @IsArray()
  @IsString({ each: true })
  readonly imageUrl: string[];

  @IsString()
  readonly slug: string;

  @IsString()
  readonly description: string;

  @IsString()
  readonly sku: string;

  @IsString()
  readonly label: string;

  @IsString()
  readonly category: string;
}
