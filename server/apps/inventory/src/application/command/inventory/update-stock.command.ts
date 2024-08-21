import { InventoryStatus } from '@libs/domain';

export class UpdateStockCommand {
  constructor(
    public productId: string,
    public quantity?: number,
    public status?: InventoryStatus,
  ) {}
}
