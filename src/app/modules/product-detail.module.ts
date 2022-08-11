import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {DialogService, DynamicDialogModule} from 'primeng/dynamicdialog';
import {ProductDetailRoutingModule} from "@modules/product-detail-routing.module";
import {PDPContainer} from "@containers/pdp/pdp";
import {ProductModalComponent} from "@components/product-modal/product-modal";
import {ProgressSpinnerModule} from 'primeng/progressspinner';
import {RouterModule} from '@angular/router';

@NgModule({
    declarations: [
        PDPContainer
    ],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        RouterModule,
        ProductDetailRoutingModule,
        DynamicDialogModule,
        ProgressSpinnerModule,
        
    ],
    providers: [
        DialogService
    ],
    entryComponents: [
        ProductModalComponent
    ],
    exports: []
})
export class ProductDetailModule {}
