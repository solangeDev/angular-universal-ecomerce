import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { PaymentInterface, Payment } from '../models/payment';

@Injectable()
export class PaymentState {
  private payment$ = new BehaviorSubject<PaymentInterface>(new Payment());
  get PaymentData(): PaymentInterface {
    return this.payment$.value;
  }

  setPayment(data: PaymentInterface): void {
    this.payment$.next(data);
  }

  getPayment(): Observable<PaymentInterface> {
    return this.payment$.asObservable();
  }
}
