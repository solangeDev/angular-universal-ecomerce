import { HttpService } from '@services/http';
import { Injectable } from '@angular/core';
import { CategoriesInterface } from '@models/category';
import { tap } from 'rxjs/operators';
import { ShippingState } from '@states/shipping';
import { AddressInterface } from '@app/models/address';

@Injectable()
export class ShippingService {
  ENDPOINT = `addresses/[addressid]`;
  readonly ENDPOINT_CITIES = `cities`;
  constructor(private http: HttpService, private shippingState: ShippingState) {}

  loadAddresses() {
    return this.http.get(`${this.ENDPOINT}`).pipe(
      tap((response) => {
        this.shippingState.setShipping(response);
      })
    );
  }

  loadCities() {
    return this.http.get(`${this.ENDPOINT_CITIES}`).pipe(
      tap((response) => {
        return response;
      })
    );
  }

  getAddresses() {
    return this.shippingState.getShipping();
  }

  addToItem(data: AddressInterface) {
    this.shippingState.addItem(data);
  }

  addToAddress(data: AddressInterface, id: string) {
    this.ENDPOINT = this.ENDPOINT.replace('[addressid]', id);
    try {
      return this.http.post(`${this.ENDPOINT}`, data);
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  updateToAddress(data: AddressInterface, id: string) {
    this.ENDPOINT = this.ENDPOINT.replace('[addressid]', id);
    try {
      return this.http.put(`${this.ENDPOINT}`, data);
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  editToAddress(data: AddressInterface, id: string) {
    this.shippingState.updateItem(data);
    return this.updateToAddress(data, id);
  }

  deleteToAddress(data: AddressInterface, id: string) {
    this.shippingState.deleteItem(data);
    this.ENDPOINT = this.ENDPOINT.replace('[addressid]', id);
    try {
      return this.http.delete(`${this.ENDPOINT}/${data.id}`);
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  setIsPrimaryAddress(data: AddressInterface, id: string) {
    this.shippingState.setIsPrimaryAddress(data);
    return this.updateToAddress(data, id);
  }
}
