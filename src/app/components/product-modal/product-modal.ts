import { Component } from '@angular/core';
import { ProductService } from '@services/product';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';

@Component({
  selector: 'app-product-modal',
  templateUrl: './product-modal.html',
  styleUrls: ['./product-modal.scss']
})
export class ProductModalComponent {

  public productCategory: { id: number };
  public index = 0;
  public loading: boolean;

  constructor(public dialogRef: DynamicDialogRef, dialogConfig: DynamicDialogConfig, private productService: ProductService) {
    this.loading = true;
    this.productService.loadCurrentProduct(dialogConfig.data).subscribe(() => this.loading = false);
  }

  close(): void {
    this.dialogRef.close()
  }

  changeTab() {
    this.index === 0 ? this.index = 1 : this.index = 0;
  }

  showFirstTab() {
    this.index = 0;
  }
}
