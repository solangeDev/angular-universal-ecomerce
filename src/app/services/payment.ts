import { HttpService } from '@services/http';
import { Injectable } from '@angular/core';
import { PaymentInterface } from '@models/payment';
import { SalesOrderInterface } from '@models/sales-order';
import { tap } from 'rxjs/operators';
import { PaymentState } from '@states/payment';

@Injectable()
export class PaymentService {
  readonly ENDPOINT = `payment`;
  ENDPOINT_SALES_ORDERS = `sales/orders`;
  constructor(private http: HttpService, private paymentState: PaymentState) {}

  getPayment() {
    return this.paymentState.getPayment();
  }

  setPayment(data: PaymentInterface) {
    return this.paymentState.setPayment(data);
  }

  addPayment(data: PaymentInterface) {
    this.setPayment(data);
    try {
      return this.http.post(`${this.ENDPOINT}`, data);
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  creteSalesOrder(data: SalesOrderInterface, id: string){
    this.ENDPOINT_SALES_ORDERS = this.ENDPOINT_SALES_ORDERS.replace('[order_id]', id)
    try {
      return this.http.post(`${this.ENDPOINT_SALES_ORDERS}`, data);
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}
