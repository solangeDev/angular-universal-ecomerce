import { Component, Inject, PLATFORM_ID, StaticProvider } from '@angular/core';
import { DialogService } from 'primeng/dynamicdialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from "rxjs";
import { DynamicDialogRef } from "primeng/dynamicdialog/dynamicdialog-ref";
import { ProductModalComponent } from "@components/product-modal/product-modal";
import { isPlatformBrowser, Location } from '@angular/common';
import { ProductService } from '@services/product';
import {AppComponent} from "@app/app.component";

@Component({
  selector: 'app-pdp-container',
  templateUrl: './pdp.html'
})
export class PDPContainer {

  public currentDialog: DynamicDialogRef;
  subscription: Subscription;
  public documentClickListener: () => void;
  public productId: number;

  constructor(
    private app: AppComponent,
    public dialogService: DialogService,
    route: ActivatedRoute,
    public router: Router,
    public productService: ProductService,
    private location: Location,
    @Inject(PLATFORM_ID) private platformId: StaticProvider[]
  ) {
    app.showAll();
    this.productId = Number(route.snapshot.params['keyword']);
    if(isPlatformBrowser(platformId)){
      this.openModal(this.productId);
    }
  }

  openModal(productId: number): void {
    this.currentDialog = this.dialogService.open(ProductModalComponent, {
      dismissableMask: false, height: '80%', width: '50%', data: productId, showHeader: false,
    });

    this.currentDialog.onClose.subscribe(() => {
      this.router.navigate(['/'])
    });
  }
}
