import { Transform } from 'class-transformer';
import { IsEnum, IsNumber, IsOptional } from 'class-validator';

import { InventoryStatus } from '@libs/domain';

export class UpdateInventoryDTO {
  @IsNumber()
  @IsOptional()
  @Transform(({ value }) => parseInt(value))
  readonly quantity?: number;

  @IsEnum(InventoryStatus)
  @IsOptional()
  readonly status?: InventoryStatus;
}
