import { isPlatformBrowser } from '@angular/common';
import { Component, Inject, inject, OnInit, PLATFORM_ID, StaticProvider } from '@angular/core';
import { CartService } from '@app/services/cart';
import { UserService } from '@app/services/user';

@Component({
  selector: 'app-right-bar',
  templateUrl: './right-bar.html',
  styleUrls: ['./right-bar.scss'],
})
export class RightBarComponent implements OnInit {
  navActive: boolean = true;

  constructor(
    private userService: UserService,
    private cartService: CartService,
    @Inject(PLATFORM_ID) private platformId: StaticProvider[]
  ) {}

  onConfigClick(e: Event): void {
    this.navActive = !this.navActive;
  }

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.cartService.clearCartLocalStorage();
      this.cartService.loadSaleQuote('ecommerce').subscribe((response) => {
        response.items.forEach((item) => {
          if (!this.userService.isLoggedIn) {
            this.cartService.addToCartLocalStorage(item);
          }
        });
      });
    }
  }
}
