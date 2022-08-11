import { Component, OnInit } from '@angular/core';
import { Payment } from '@app/models/payment';
import { PaymentService } from '@app/services/payment';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.html',
  styleUrls: ['./payment.scss']
})
export class PaymentComponent implements OnInit {
  payment: string;
  constructor(public paymentService: PaymentService) { }

  setPayment(){
    const payment = new Payment();
    payment.method = 'cash';
    this.paymentService.setPayment(payment);
  }

  ngOnInit(): void {
    this.setPayment();
    this.paymentService.getPayment().subscribe((data)=>{
      this.payment = data.method;
    })
  }

}
