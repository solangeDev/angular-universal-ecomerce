import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductListComponent } from '@components/product-list/product-list';
import { ProductCardComponent } from '@components/product-card/product-card';
import { ProductModalComponent } from '@components/product-modal/product-modal';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { RouterModule } from '@angular/router';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { TabViewModule } from 'primeng/tabview';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { DropdownModule } from 'primeng/dropdown';
import { DividerModule } from 'primeng/divider';
import { ProductsRelatedComponent } from '@components/products-related/products-related';
import { ProductDetailComponent } from '@components/product-detail/product-detail';
import { InputTextModule } from 'primeng/inputtext';
import { MenubarModule } from 'primeng/menubar';
import { TranslateModule } from '@ngx-translate/core';
import { SkeletonModule } from 'primeng/skeleton';
import { ToastModule } from 'primeng/toast';
import { InputNumberModule } from 'primeng/inputnumber';
import { PasswordModule } from 'primeng/password';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RadioButtonModule } from 'primeng/radiobutton';
import { SelectButtonModule } from 'primeng/selectbutton';
import { NgControl } from '@angular/forms';
import { CheckboxModule } from 'primeng/checkbox';
import { TooltipModule } from 'primeng/tooltip';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    ProgressSpinnerModule,
    InfiniteScrollModule,
    TabViewModule,
    DialogModule,
    ButtonModule,
    RippleModule,
    DropdownModule,
    DividerModule,
    ButtonModule,
    InputTextModule,
    MenubarModule,
    TranslateModule,
    SkeletonModule,
    ToastModule,
    PasswordModule,
    InputNumberModule,
    BrowserModule,
    ReactiveFormsModule,
    FormsModule,
    RadioButtonModule,
    SelectButtonModule,
    CheckboxModule,
    TooltipModule,
  ],
  declarations: [
    ProductListComponent,
    ProductCardComponent,
    ProductModalComponent,
    ProductsRelatedComponent,
    ProductDetailComponent,
  ],
  exports: [
    ProgressSpinnerModule,
    ProductListComponent,
    ProductCardComponent,
    ProductModalComponent,
    TabViewModule,
    DialogModule,
    ButtonModule,
    RippleModule,
    DropdownModule,
    DividerModule,
    ButtonModule,
    InputTextModule,
    MenubarModule,
    SkeletonModule,
    ToastModule,
    PasswordModule,
    InputNumberModule,
    BrowserModule,
    ReactiveFormsModule,
    FormsModule,
    RadioButtonModule,
    SelectButtonModule,
    CheckboxModule,
    TooltipModule,
  ],
})
export class SharedModule {}
