import { Component, OnInit } from '@angular/core';
import { AddressInterface } from '@app/models/address';
import { ProductInterface } from '@app/models/product';
import { SalesOrderInterface, SalesOrder } from '@app/models/sales-order';
import { CartService } from '@app/services/cart';
import { PaymentService } from '@app/services/payment';
import { ShippingService } from '@app/services/shipping';
import { UserService } from '@app/services/user';
import { ShippingState } from '@app/states/shipping';

@Component({
  selector: 'app-order-summary',
  templateUrl: './order-summary.html',
  styleUrls: ['./order-summary.scss'],
})
export class OrderSummaryComponent implements OnInit {
  saleOrder: SalesOrderInterface = new SalesOrder();
  disabled: boolean = true;
  totalOrder = 0;
  totalTaxes = 0;
  constructor(
    private cartService: CartService,
    private paymentService: PaymentService,
    public shippingServide: ShippingService
  ) {}

  ngOnInit(): void {
    this.loadSaleOrder();
    this.cartService.getCart().subscribe((response) => {
      if (response.items.length > 0) {
        this.disabled = false;
      } else {
        this.disabled = true;
      }
    });
    this.cartService.getSummary().subscribe((response)=>{
      this.totalOrder = response.total;
      this.totalTaxes = response.totalTaxes;
      
    })
  }

  loadSaleOrder() {
    this.cartService.getCart().subscribe((response) => {
      if (response.id !== undefined) {
        this.saleOrder = { ...this.saleOrder, quote: response.id };
      }
    });
    this.shippingServide.getAddresses().subscribe((response) => {
      const address = response.filter((item) => {
        if (item.isPrimary) {
          return item;
        } else {
          return;
        }
      });
      if (address.length > 0) {
        this.saleOrder = { ...this.saleOrder, shippingAddress: address[0].address };
      }
    });
  }

  checkout() {
    this.disabled = true;
    this.paymentService.creteSalesOrder(this.saleOrder, 'ecomerce').subscribe((response) => {
      this.disabled = false;
    });
  }
}
