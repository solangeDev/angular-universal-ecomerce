import { Inject, Injectable, PLATFORM_ID, StaticProvider } from '@angular/core';
import { CartInterface } from '@app/models/cart';
import { CreatedResponseInterface, UpdatedResponseInterface } from '@app/models/service';
import { ProductInterface } from '@models/product';
import { CartState } from '@states/cart';
import { Observable, tap } from 'rxjs';
import { HttpService } from './http';
import { SessionService } from './session';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  readonly ENDPOINT_QUOTE = `sales/quotes`;
  readonly ENDPOINT_POSS_SESSION = `poss/ecommerce/session`;
  constructor(private cartState: CartState, private http: HttpService, private sessionService: SessionService) {}

  loadSaleQuote(id: string) {
    return this.http.get(`${this.ENDPOINT_QUOTE}/${id}`).pipe(
      tap((response: CartInterface) => {
        this.cartState.setCart(response);
      })
    );
  }

  addSaleQuote(data: CartInterface): Observable<CreatedResponseInterface> {
    try {
      return this.http.post(`${this.ENDPOINT_QUOTE}`, data);
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  editSaleQuote(data: CartInterface): Observable<UpdatedResponseInterface> {
    try {
      return this.http.put(`${this.ENDPOINT_QUOTE}`, data);
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  getCart() {
    return this.cartState.getCart();
  }

  getSummary() {
    return this.cartState.getSummary();
  }

  addToCart(product: ProductInterface): void {
    this.cartState.addItem(product);
  }

  clearCartLocalStorage() {
    this.sessionService.setItem('cart', JSON.stringify([]));
  }

  getCartLocalStorage() {
    let cartStorage = this.sessionService.getItem('cart');
    if (cartStorage !== null) {
      // @ts-ignore
      return [...JSON.parse(cartStorage)];
    } else {
      return [];
    }
  }

  addToCartLocalStorage(product: ProductInterface): void {
    let cart: ProductInterface[] = [];
    cart = this.getCartLocalStorage();
    cart.push(product);
    this.sessionService.setItem('cart', JSON.stringify(cart));
  }

  deleteToCart(data: ProductInterface): void {
    this.cartState.deleteItem(data);
  }

  updateToItemCant(data: ProductInterface): void {
    this.cartState.updateToItemCant(data);
  }
}
