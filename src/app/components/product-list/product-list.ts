import { Component, Inject, OnDestroy, OnInit, PLATFORM_ID, StaticProvider } from "@angular/core";
import {  ProductInterface } from "@models/product";
import { ProductService } from "@services/product";
import { NavigationEnd, Router } from "@angular/router";
import { BehaviorSubject, fromEvent, Subscription } from "rxjs";
import { isPlatformBrowser } from "@angular/common";

@Component({
  selector: "app-product-list",
  templateUrl: "./product-list.html",
})
export class ProductListComponent implements OnInit, OnDestroy {
  
  public validateScroll = true;
  public pagePaginator = 0;
  public products: ProductInterface[] = [];
  public keyword: string = "";
  public routerSubscription: Subscription;
  public showKeyword: boolean;

  constructor(
    private productService: ProductService,
    private router: Router,
    @Inject(PLATFORM_ID) 
    private platformId: StaticProvider[]
  ) {
    this.routerSubscription = this.router.events.subscribe((event) => {
      if(event instanceof NavigationEnd) {
        this.keyword = event.url.slice(0,8) === '/search/' ? event.url.slice(8,-1) : '';
      }
    });
  }

  ngOnInit() {
    this.getProducts();
    if(isPlatformBrowser(this.platformId)) fromEvent(window, 'load').subscribe(() => this.showKeyword = true);
  }

  getProducts(): void {
    this.productService.getProducts().subscribe((data) => {
      this.products = data;
    });
  }

  onScrollDown(): void {
    if (this.validateScroll) {
      this.pagePaginator++;
      this.productService.loadProducts(this.keyword, this.pagePaginator).subscribe();
    }
  }

  ngOnDestroy(): void {
    this.routerSubscription.unsubscribe();
  }
}
