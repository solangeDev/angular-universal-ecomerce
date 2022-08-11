export interface SalesOrderInterface {
  quote: string;
  shippingAddress: string;
}

export class SalesOrder implements SalesOrderInterface {
  constructor(public quote = '', public shippingAddress = '') {}
}
