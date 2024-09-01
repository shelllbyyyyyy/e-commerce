import { Injectable } from '@nestjs/common';

import { BankTransferMethod, PaymentMethod } from '@libs/domain';
import { AddressResponse, OrderResponse, UserResponse } from '@libs/shared';

import { Charge } from '@/billing/infrastructure/midtrans/dto';

@Injectable()
export class GetPaymentMethod {
  constructor() {}
  execute(
    data: PaymentMethod,
    user: UserResponse,
    address: AddressResponse,
    order: OrderResponse,
    transfer?: BankTransferMethod,
  ): Charge {
    let payload: Charge;

    const handleBankTransfer = (bankMethod: BankTransferMethod) => {
      switch (bankMethod) {
        case BankTransferMethod.BCA:
          payload = {
            payment_type: PaymentMethod.BANK_TRANSFER,
            transaction_details: {
              order_id: order.id,
              gross_amount: order.total_amount,
            },
            customer_details: {
              email: user.email,
              first_name: address.first_name,
              last_name: address.last_name,
              phone: user.phone_number,
              shipping_address: address,
              billing_address: address,
            },
            item_details: order.items,
            bank_transfer: {
              bank: BankTransferMethod.BCA,
              va_number: '1265341299734671',
              free_text: {
                inquiry: [
                  {
                    id: 'Free Text ID Free Text ID Free Text ID',
                    en: 'Free Text EN Free Text EN Free Text EN',
                  },
                ],
                payment: [
                  {
                    id: 'Free Text ID Free Text ID Free Text ID',
                    en: 'Free Text EN Free Text EN Free Text EN',
                  },
                ],
              },
              bca: {
                sub_company_code: '00000',
              },
            },
          };
          break;
        case BankTransferMethod.BNI:
          payload = {
            payment_type: PaymentMethod.BANK_TRANSFER,
            transaction_details: {
              order_id: order.id,
              gross_amount: order.total_amount,
            },
            customer_details: {
              email: user.email,
              first_name: address.first_name,
              last_name: address.last_name,
              phone: user.phone_number,
              shipping_address: address,
              billing_address: address,
            },
            item_details: order.items,
            bank_transfer: {
              bank: BankTransferMethod.BNI,
              va_number: '1265341299734671',
            },
          };
          break;
        case BankTransferMethod.PERMATA:
          payload = {
            payment_type: PaymentMethod.BANK_TRANSFER,
            transaction_details: {
              order_id: order.id,
              gross_amount: order.total_amount,
            },
            customer_details: {
              email: user.email,
              first_name: address.first_name,
              last_name: address.last_name,
              phone: user.phone_number,
              shipping_address: address,
              billing_address: address,
            },
            item_details: order.items,
            bank_transfer: {
              bank: BankTransferMethod.PERMATA,
              va_number: '1265341299734671',
              permata: {
                recipient_name: 'Arif Ramdani',
              },
            },
          };

          break;
        default:
          throw new Error('Unknown bank transfer method');
      }
    };

    switch (data) {
      case PaymentMethod.BANK_TRANSFER:
        handleBankTransfer(transfer);

        break;
      case PaymentMethod.QRIS:
        payload = {
          payment_type: PaymentMethod.QRIS,
          transaction_details: {
            order_id: order.id,
            gross_amount: order.total_amount,
          },
          customer_details: {
            email: user.email,
            first_name: address.first_name,
            last_name: address.last_name,
            phone: user.phone_number,
            shipping_address: address,
            billing_address: address,
          },
          item_details: order.items,
          qris: {
            acquirer: 'gopay',
          },
        };

        break;
      default:
        throw new Error('Unknown transfer method');
    }

    return payload;
  }
}
