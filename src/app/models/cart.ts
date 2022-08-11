import { ProductInterface } from '@models/product';

export interface CartInterface {
  id?: string;
  posSession: string;
  customer: string;
  currency: string;
  items: ProductInterface[] | [];
}

export class Cart implements CartInterface {
  constructor(public posSession = '', public customer = '', public currency = '', public items = []) {}
}
