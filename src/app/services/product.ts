import { Injectable } from "@angular/core";
import { ProductInterface } from "@models/product";
import { ProductsState } from "@states/products";
import { Observable, tap } from "rxjs";
import { HttpService } from "./http";
import { CategoriesInterface } from "@models/category";

@Injectable({
  providedIn: "root",
})
export class ProductService {
  private ENDPOINT_PRODUCTS: string = "products";

  constructor(
    private httpService: HttpService,
    private productsState: ProductsState
  ) { }

  initLoadProducts() {
    return this.httpService.get(`${this.ENDPOINT_PRODUCTS}`).pipe(
      tap((response) => {
        this.productsState.setProducts(response.data);
      })
    );
  }

  getCurrentProduct() {
    return this.productsState.getCurrentProduct();
  }

  getProducts() {
    return this.productsState.getProducts();
  }

  getProductsRelated() {
    return this.productsState.getProductsRelated();
  }

  loadProducts(keyword: string = "", pageNumber: number = 0): Observable<ProductInterface[]> {
    return this.httpService.get(`${this.ENDPOINT_PRODUCTS}?page=${pageNumber}${keyword !== "" ? '&keyword=' + keyword : ''}`).pipe(
      tap((response: any) => {
        pageNumber > 0 ? this.addProducts(response.data) : this.productsState.setProducts(response.data);
      })
    );
  }

  addProducts(products: ProductInterface[]): void {
    this.productsState.addProducts(products);
  }

  setCurrentProduct(product: ProductInterface) {
    this.productsState.setCurrentProduct(product);

  }

  loadCurrentProduct(productId: number) {
    return this.httpService.get(`${this.ENDPOINT_PRODUCTS}/${productId}`).pipe(tap((response: any) => this.setCurrentProduct(response)));
  }


  loadProductsRelated(category:{id:number}): Observable<ProductInterface[]> {
    return this.httpService.get(`${this.ENDPOINT_PRODUCTS}?category=${category}`).pipe(
      tap((response: any) => {
        this.productsState.setProductsRelated(response.data);
      })
    );
  }
}
