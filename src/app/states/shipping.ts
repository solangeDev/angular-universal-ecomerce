import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Address, AddressInterface } from '@app/models/address';
@Injectable()
export class ShippingState {
  private shipping$ = new BehaviorSubject<AddressInterface[]>([]);

  getShipping(): Observable<AddressInterface[]> {
    return this.shipping$.asObservable();
  }

  setShipping(data: AddressInterface[]): void {
    this.shipping$.next(data);
  }

  addItem(data: AddressInterface): void {
    let addresses = [...this.shipping$.value];
    addresses.push(data);
    this.shipping$.next(addresses);
  }

  deleteItem(data: AddressInterface): void {
    let addresses = [...this.shipping$.value];
    addresses = addresses.filter((item: AddressInterface) => {
      if (item.id !== data.id) {
        return item;
      } else {
        return;
      }
    });
    this.shipping$.next(addresses);
  }

  updateItem(data: AddressInterface): void {
    let addresses = [...this.shipping$.value];
    addresses = addresses.map((item: AddressInterface) => {
      let b = { ...item };
      if (item.id === data.id) {
        b = data;
      }
      return b;
    });
    this.shipping$.next(addresses);
  }

  setIsPrimaryAddress(data: AddressInterface) {
    let addresses = [...this.shipping$.value];
    if (data.isPrimary) {
      addresses = addresses.map((item: AddressInterface) => {
        let b = { ...item };
        b.isPrimary = false;
        if (item.id === data.id) {
          b.isPrimary = true;
        }
        return b;
      });
      this.shipping$.next(addresses);
    } else {
      this.updateItem(data);
    }
  }
}
