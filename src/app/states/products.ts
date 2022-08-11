import { Injectable } from '@angular/core';
import {  ProductInterface } from '@models/product';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable()
export class ProductsState {
  private products$ = new BehaviorSubject<ProductInterface[]>([]);
  private productsRelated$ = new BehaviorSubject<ProductInterface[]>([]);
  private currentProduct$ = new BehaviorSubject<ProductInterface | null>(null);

  get products(): ProductInterface[] {
    return this.products$.value;
  }

  get productsRelated(): ProductInterface[] {
    return this.productsRelated$.value;
  }

  setProducts(products: ProductInterface[]): void {
    this.products$.next(products);
  }

  setCurrentProduct(product: ProductInterface): void {
    this.currentProduct$.next(product);
  }

  setProductsRelated(products: ProductInterface[]): void {
    this.productsRelated$.next(products);
  }

  getCurrentProduct(): Observable<ProductInterface | null> {
    return this.currentProduct$.asObservable();
  }

  getProducts(): Observable<ProductInterface[]> {
    return this.products$.asObservable();
  }

  getProductsRelated(): Observable<ProductInterface[]> {
    return this.productsRelated$.asObservable();
  }
  addProducts(products: ProductInterface[]): ProductInterface[] {
    this.products.push(...products);
    this.products$.next(this.products);
    return products;
  }
}
