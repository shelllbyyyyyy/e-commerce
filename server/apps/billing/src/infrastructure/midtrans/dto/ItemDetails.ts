import { z } from 'zod';

export const ItemSchema = z.object({
  id: z.string().nullish(),
  name: z.string(),
  price: z.number(),
  quantity: z.number(),
  sku: z.string().nullish(),
  label: z.string().nullish(),
});

export const ItemDetailsSchema = z.array(ItemSchema);

export type Item = z.infer<typeof ItemSchema>;
export type ItemDetails = z.infer<typeof ItemDetailsSchema>;
