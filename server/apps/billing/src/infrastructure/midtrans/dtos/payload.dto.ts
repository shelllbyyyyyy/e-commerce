export class PayloadDTO {
  static createBankTransferTransaction(
    orderId: string,
    grossAmount: number,
    customerDetails: any,
    bank: string,
  ) {
    let bankTransferConfig: any;

    switch (bank) {
      case 'bca':
        bankTransferConfig = {
          bank: 'bca',
          va_number: '12345678',
          free_text: {
            inquiry: [
              {
                en: 'Payment to BCA Virtual Account',
                id: 'Pembayaran ke BCA Virtual Account',
              },
            ],
            payment: [
              {
                en: 'Payment to BCA Virtual Account',
                id: 'Pembayaran ke BCA Virtual Account',
              },
            ],
          },
        };
        break;

      case 'bni':
        bankTransferConfig = {
          bank: 'bni',
          va_number: '98765432',
        };
        break;

      case 'mandiri':
        bankTransferConfig = {
          bank: 'mandiri',
          bill_info1: 'Payment:',
          bill_info2: 'Mandiri Bill Payment',
        };
        break;

      default:
        throw new Error(
          'Invalid bank code. Only "bca", "bni", and "mandiri" are supported.',
        );
    }

    const parameter = {
      transaction_details: {
        order_id: orderId,
        gross_amount: grossAmount,
      },
      customer_details: customerDetails,
      bank_transfer: bankTransferConfig,
    };
  }
}
