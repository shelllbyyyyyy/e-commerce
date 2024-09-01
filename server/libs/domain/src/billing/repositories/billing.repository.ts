import { Injectable } from '@nestjs/common';
import { Billing } from '../entities/billing';

@Injectable()
export abstract class BillingRepository {
  abstract save(data: Billing): Promise<Billing>;
  abstract update(data: Billing): Promise<Billing>;
  abstract findAll(): Promise<Billing[]>;
  abstract findById(billingId: string): Promise<Billing>;
  abstract findByOrderId(orderId: string): Promise<Billing>;
  abstract findByUserId(userId: string): Promise<Billing[]>;
}
