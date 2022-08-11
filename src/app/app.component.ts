import { isPlatformBrowser } from '@angular/common';
import { Component, Inject, OnInit, PLATFORM_ID, StaticProvider } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { CategoryService } from '@services/category';
import { ProductService } from '@services/product';
import { UserService } from '@services/user';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {
  private viewProductList = true;
  private viewLeftBar = true;
  private viewRightBar = true;
  private viewHeader = true;

  constructor(
    private categoryService: CategoryService,
    private userService: UserService,
    private translate: TranslateService,
    private productService: ProductService,
    @Inject(PLATFORM_ID) private platformId: StaticProvider[]
  ) {
    if (isPlatformBrowser(this.platformId)) {
      translate.setDefaultLang('es');
      translate.use('es');
    }
  }

  public showAll(): void {
    this.viewLeftBar = true;
    this.viewRightBar = true;
    this.viewProductList = true;
    this.viewHeader = true;
  }

  public hideAll(): void {
    this.viewLeftBar = false;
    this.viewRightBar = false;
    this.viewProductList = false;
    this.viewHeader = false;
  }

  public hideProductList(): void {
    this.viewProductList = false;
  }

  public showProductList(): void {
    this.viewProductList = true;
  }

  public isAllowedProductList() {
    return this.viewProductList;
  }

  public hideLeftBar(): void {
    this.viewLeftBar = false;
  }

  public showLeftBar(): void {
    this.viewLeftBar = true;
  }

  public isAllowedLeftBar() {
    return this.viewLeftBar;
  }

  public hideRightBar(): void {
    this.viewRightBar = false;
  }

  public showRightBar(): void {
    this.viewRightBar = true;
  }

  public isAllowedRightBar() {
    return this.viewRightBar;
  }

  public hideHeader(): void {
    this.viewHeader = false;
  }

  public isAllowedHeader() {
    return this.viewHeader;
  }
  ngOnInit(): void {
    this.productService.loadProducts().subscribe();
    this.categoryService.loadCategories().subscribe();
    // this.userService.loadUser();
  }
}
