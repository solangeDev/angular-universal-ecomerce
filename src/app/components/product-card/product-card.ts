import { Component, Input, OnInit } from '@angular/core';
import { CartService } from '@app/services/cart';
import { ProductInterface } from '@models/product';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.html',
  styleUrls: ['./product-card.scss'],
})
export class ProductCardComponent implements OnInit {
  @Input() product!: ProductInterface;
  @Input() showActions = false;
  @Input() fixedActions = false;
  @Input() control?: any;
  @Input() size = 'm';

  constructor(private cartService: CartService) {}

  ngOnInit(): void {}

  deleteToCart(): void {
    this.cartService.deleteToCart(this.product);
  }

  onInput(e: Event) {
    // @ts-ignore
    const value = e.value;
    if (value > 0) {
      this.product.quantity = parseInt(value);
      this.cartService.updateToItemCant(this.product);
    }
  }
}
