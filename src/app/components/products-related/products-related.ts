import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { ProductInterface } from "@models/product";
import { ProductService } from "@services/product";
import { BehaviorSubject } from "rxjs";

@Component({
  selector: "app-products-related",
  templateUrl: "./products-related.html",
})
export class ProductsRelatedComponent implements OnInit {
  
  public isLoading$: BehaviorSubject<boolean>;
  public products: ProductInterface[] = [];
  @Input() category: {id:number};
  @Output() firstTab: EventEmitter<boolean> = new EventEmitter

  constructor(
    private productService: ProductService,
  ) {
    this.isLoading$ = new BehaviorSubject<boolean>(false);
  }

  ngOnInit() {
    this.productService.loadProductsRelated(this.category).subscribe();
    this.getProductsRelated();
  }

  getProductsRelated(): void {
    this.isLoading$.next(true);
    this.productService.getProductsRelated().subscribe((data) => {
      this.products = data.slice(2,-1);
      this.isLoading$.next(false);
    });
  }

  showFirstTab(product: ProductInterface) {
    this.productService.setCurrentProduct(product);
    this.firstTab.emit(true);
  }
  
}
