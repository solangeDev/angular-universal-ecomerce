export interface PaymentInterface {
  amountToPay: string;
  receivedAmount: string;
  currency: string;
  method: string;
  saleOrder: string;
}

export class Payment implements PaymentInterface {
  constructor(
    public amountToPay = '',
    public receivedAmount = '',
    public currency = '',
    public method = '',
    public saleOrder = ''
  ) {}
}
