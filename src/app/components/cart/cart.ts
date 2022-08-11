import { Component, Inject, Input, OnInit, PLATFORM_ID, StaticProvider } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { ProductInterface } from '@app/models/product';
import { Cart, CartInterface } from '@app/models/cart';
import { User } from '@app/models/user';
import { CartService } from '@app/services/cart';
import { ProductService } from '@app/services/product';
import { ProductModalComponent } from '../product-modal/product-modal';
import { Router } from '@angular/router';
import { UserService } from '@app/services/user';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.html',
  styleUrls: ['./cart.scss'],
})
export class CartComponent implements OnInit {
  @Input() fullWith = false;
  @Input() fixedActions = false;
  cart: CartInterface = new Cart();
  form!: FormGroup;
  constructor(
    private fb: FormBuilder,
    private cartService: CartService,
    private productService: ProductService,
    public router: Router,
    private userService: UserService,
    @Inject(PLATFORM_ID) private platformId: StaticProvider[]
  ) {}

  loadCart() {
    if (isPlatformBrowser(this.platformId)) {
      this.cartService.getCart().subscribe((response) => {
        this.items.controls = [];
        response.items.forEach((item: any) => {
          const itemForm: any = new Object();
          itemForm['item_' + item.id] = [item.quantity !== undefined ? item.quantity : 1, []];
          this.items.push(this.fb.group(itemForm));
        });
        if (this.userService.isLoggedIn) {
          this.editSaleQuote(response.items);
        }
        this.cart = response;
      });
    }
  }

  addSaleQuote() {
    this.cartService.addSaleQuote(this.cart).subscribe((response) => {});
  }

  editSaleQuote(data: ProductInterface[]) {
    this.cart.items = data;
    this.cartService.editSaleQuote(this.cart).subscribe((response) => {});
  }

  get items(): any {
    return this.form.controls['items'] as FormArray;
  }

  get formControl() {
    return this.form.controls;
  }

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      console.log(this.userService.isLoggedIn, 'jajaja');
      if (this.userService.isLoggedIn) {
        this.addSaleQuote();
      }
    }
    this.form = this.fb.group({
      items: this.fb.array([]),
    });
    this.loadCart();
  }

  onSubmit(): void {
    if (isPlatformBrowser(this.platformId)) {
      if (this.userService.isLoggedIn) {
        this.router.navigate([`/cart`]);
      } else {
        this.router.navigate([`/login`]);
      }
    }
  }
}
