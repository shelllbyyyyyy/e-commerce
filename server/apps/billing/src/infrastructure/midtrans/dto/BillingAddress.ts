import { z } from 'zod';

export const BillingAddressSchema = z.object({
  first_name: z.string(),
  last_name: z.string(),
  email: z.string(),
  phone_number: z.string(),
  street: z.string(),
  city: z.string(),
  postal_code: z.string(),
  country_code: z.string(),
});

export const ShippingAddressSchema = BillingAddressSchema;

export type BillingAddress = z.infer<typeof BillingAddressSchema>;
export type ShippingAddress = z.infer<typeof ShippingAddressSchema>;
