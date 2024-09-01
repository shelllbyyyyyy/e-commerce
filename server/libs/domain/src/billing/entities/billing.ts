import { Order } from '@libs/domain/order/entities/order.entity';

export enum PaymentMethod {
  CREDIT_CARD = 'credit_card',
  BANK_TRANSFER = 'bank_transfer',
  QRIS = 'qris',
  DIRECT_DEBIT = 'direct_debit',
  CSTORE = 'cstore',
  GOPAY = 'gopay',
  SHOPPE_PAY = 'shoppepay',
  ECHANNEL = 'echannel',
  BCA_KLIKPAY = 'bca_klikpay',
  BCA_KLIKBCA = 'bca_klikbca',
  CIMB_CLICKS = 'cimb_clicks',
  UOB_EZPAY = 'uob_ezpay',
}

export enum BankTransferMethod {
  BCA = 'bca',
  BNI = 'bni',
  PERMATA = 'permata',
}

export enum BillingStatus {
  PENDING = 'PENDING',
  PAID = 'PAID',
  FAILED = 'FAILED',
}

export class Billing {
  constructor(
    private readonly id: string,
    private readonly userId: string,
    private readonly order: Order,
    private readonly amount: number,
    private readonly payment_method: PaymentMethod,
    private readonly status: BillingStatus,
    private readonly creatdAt?: Date,
    private readonly updatedAt?: Date,
  ) {
    this.id = id;
    this.userId = userId;
    this.order = order;
    this.amount = amount;
    this.payment_method = payment_method;
    this.status = status;
    this.creatdAt = creatdAt;
    this.updatedAt = updatedAt;
  }

  getId(): string {
    return this.id;
  }

  getUserId(): string {
    return this.userId;
  }

  getOrder(): Order {
    return this.order;
  }

  getAmount(): number {
    return this.amount;
  }

  getPaymentMethod(): PaymentMethod {
    return this.payment_method;
  }

  getStatus(): BillingStatus {
    return this.status;
  }

  getCreatedAt(): Date {
    return this.creatdAt;
  }

  getUpdatedAt(): Date {
    return this.updatedAt;
  }

  static createNewBilling({
    id,
    userId,
    order,
    amount,
    payment_method,
  }: {
    id: string;
    userId: string;
    order: Order;
    amount: number;
    payment_method: PaymentMethod;
  }): Billing {
    return new Billing(
      id,
      userId,
      order,
      amount,
      payment_method,
      BillingStatus.PENDING,
      new Date(),
    );
  }

  markAsPaid(): Billing {
    return new Billing(
      this.id,
      this.userId,
      this.order,
      this.amount,
      this.payment_method,
      BillingStatus.PAID,
      this.creatdAt,
      new Date(),
    );
  }

  markAsFailed(): Billing {
    return new Billing(
      this.id,
      this.userId,
      this.order,
      this.amount,
      this.payment_method,
      BillingStatus.FAILED,
      this.creatdAt,
      new Date(),
    );
  }
}
