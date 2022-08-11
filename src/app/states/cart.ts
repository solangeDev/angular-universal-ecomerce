import { Injectable } from '@angular/core';
import { appliedModifiersInterface, ProductInterface } from '@models/product';
import { BehaviorSubject, elementAt, Observable } from 'rxjs';
import { Cart, CartInterface } from '@app/models/cart';
import { SummaryInterface } from '@app/models/summary';
@Injectable()
export class CartState {
  private cart$ = new BehaviorSubject<CartInterface>(new Cart());
  private summary$ = new BehaviorSubject<SummaryInterface>({
    total: 0,
    totalTaxes: 0,
  });

  setSummary() {
    let summary = { ...this.summary$.value };
    let cart = { ...this.cart$.value };
    let totalSummary = 0;
    let totalFixed = 0;
    cart.items.forEach((product) => {
      totalSummary += product.price * product.quantity;
      product.appliedModifiers.forEach((element: appliedModifiersInterface) => {
        if (element.isTax) {
          if (element.type === 'fixedPrice') {
            totalFixed+= this.getPriceByOperation(product.price, element.value, element.operation);
          } else if (element.type === 'percent') {
            totalFixed+= this.getPriceByOperation(
              product.price,
              (product.price * element.value) / 100,
              element.operation
            );
          }
          totalFixed = totalFixed - product.price;
        }
      });
    });
    summary.totalTaxes = totalFixed;
    summary.total = totalSummary;
    this.summary$.next(summary);
  }

  getSummary(): Observable<SummaryInterface> {
    return this.summary$.asObservable();
  }

  getCart(): Observable<CartInterface> {
    return this.cart$.asObservable();
  }

  setCart(data: CartInterface): void {
    data.items.forEach((item: ProductInterface) => {
      this.appliedModifiers(item);
    });
    this.cart$.next(data);
    this.setSummary();
  }

  addItem(product: ProductInterface): void {
    let cart = { ...this.cart$.value };
    let items = [...cart.items];
    this.appliedModifiers(product);
    items.push(product);
    cart.items = items;
    this.cart$.next(cart);
    this.setSummary();
  }

  deleteItem(data: ProductInterface): void {
    let cart = { ...this.cart$.value };
    let items = [...cart.items];
    items = items.filter((item: ProductInterface) => {
      if (item.id !== data.id) {
        return item;
      } else {
        return;
      }
    });
    cart.items = items;
    this.cart$.next(cart);
    this.setSummary();
  }

  updateToItemCant(data: ProductInterface): void {
    let cart = { ...this.cart$.value };
    let items = [...cart.items];
    items = items.map((item: ProductInterface) => {
      let b = { ...item };
      if (item.id === data.id) {
        b.quantity = data.quantity;
      }
      return b;
    });
    cart.items = items;
    this.cart$.next(cart);
    this.setSummary();
  }

  getPriceByOperation(originalPrice: number, value: number, operation: string) {
    let total = 0;
    switch (operation) {
      case 'add':
        total = originalPrice + value;
        break;
      case 'subtract':
        total = originalPrice - value;
        break;
      case 'divide':
        total = originalPrice / value;
        break;
      case 'multiply':
        total = originalPrice * value;
        break;
    }
    return total;
  }

  getPriceByType(product: ProductInterface, element: appliedModifiersInterface) {
    let val = product.price;
    if (!element.isTax) {
      if (element.type === 'fixedPrice') {
        val = this.getPriceByOperation(product.price, element.value, element.operation);
      } else if (element.type === 'percent') {
        val = this.getPriceByOperation(product.price, (product.price * element.value) / 100, element.operation);
      }
    }
    return val;
  }

  appliedModifiers(product: ProductInterface) {
    if (product.appliedModifiers.length > 0) {
      product.appliedModifiers.forEach((element: appliedModifiersInterface) => {
        product.price = this.getPriceByType(product, element);
      });
    }
  }
}
