import { Component, Inject, PLATFORM_ID, StaticProvider } from '@angular/core';
import { ProductInterface } from '@models/product';
import { CartService } from '@services/cart';
import { ProductService } from '@services/product';
import { MessageService } from 'primeng/api';
import { TranslateService } from '@ngx-translate/core';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { UserService } from '@app/services/user';
import { isPlatformBrowser } from '@angular/common';
@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.html',
  styleUrls: ['./product-detail.scss'],
})
export class ProductDetailComponent {
  public product: ProductInterface;
  public options = [];
  public primaryImage?: string[];
  public confirmMessage: string;
  constructor(
    private userService: UserService,
    public dialogRef: DynamicDialogRef,
    private productService: ProductService,
    private cartService: CartService,
    private messageService: MessageService,
    private translateService: TranslateService,
    @Inject(PLATFORM_ID) private platformId: StaticProvider[]
  ) {
    this.productService.getCurrentProduct().subscribe((data: ProductInterface | null) => {
      if (data !== null) {
        this.product = data;
        this.primaryImage = data.images;
        const keys = data.variationValues && Object.keys(data.variationValues);
        keys?.map((key) => {
          if (data.variationValues) {
            // @ts-ignore
            this.options.push(data.variationValues[key]);
          }
        });
      }
    });
  }

  addToCart(product: ProductInterface): void {
    this.cartService.addToCart(product);
    if (isPlatformBrowser(this.platformId)) {
      if (!this.userService.isLoggedIn) {
        this.cartService.addToCartLocalStorage(product);
      }
    }
    this.translateService.get('pdp-toast-message-add-to-cart').subscribe((message) => (this.confirmMessage = message));
    this.messageService.add({ severity: 'success', summary: this.confirmMessage, detail: product.name });
    this.dialogRef.close();
  }

  moveToPrimary(img: string): void {
    this.primaryImage = [img];
  }
}
