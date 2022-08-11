import { Component, OnInit } from '@angular/core';
import { AppComponent } from '@app/app.component';
import { ShippingService } from '@app/services/shipping';

@Component({
  selector: 'app-cart-container',
  templateUrl: './cart.html',
  styleUrls: ['./cart.scss']
})
export class CartContainer implements OnInit {

  constructor(private app: AppComponent, private shippingService: ShippingService) { 
    app.hideProductList();
    app.hideRightBar();
  }

  ngOnInit(): void {
    this.shippingService.loadAddresses().subscribe();
  }

}
