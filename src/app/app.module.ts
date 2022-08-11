import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeContainer } from '@containers/home/home';
import { HeaderComponent } from '@components/header/header';
import { LeftBarComponent } from '@components/left-bar/left-bar';
import { RightBarComponent } from '@components/right-bar/right-bar';
import { FooterComponent } from '@components/footer/footer';
import { ProductService } from '@services/product';
import { PLATFORM_ID, APP_ID, Inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { SearchContainer } from '@containers/search/search';
import { ProductsState } from '@states/products';
import { HttpErrorHandler } from '@services/http-error-handler';
import { CategoryService } from '@services/category';
import { CategoryState } from '@states/category';
import { HttpService } from '@services/http';
import { CompanyState } from '@states/company';
import { CompanyService } from '@services/company';
import { showClientSide } from './directives/show-client-side';
import { GlobalDataState } from '@states/global-data';
import { GlobalDataService } from '@services/global-data';
import { UploadImageComponent } from '@app/components/upload-image/upload-image';
import { ProfileContainer } from '@containers/profile/profile';
import { ProfileComponent } from '@components/profile/profile';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SelectButtonModule } from 'primeng/selectbutton';
import { DropdownModule } from 'primeng/dropdown';
import { UserService } from '@services/user';
import { UserState } from '@states/user';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { MessageService } from 'primeng/api';
import { CartService } from '@services/cart';
import { CartState } from '@states/cart';
import { ProductDetailModule } from '@modules/product-detail.module';
import { SharedModule } from './shared.module';
import { RouterModule } from '@angular/router';
import { SignupComponent } from '@components/signup/signup';
import { SignupContainer } from '@containers/signup/signup';
import { SessionService } from '@services/session';
import { LoginContainer } from '@containers/login/login';
import { LoginComponent } from '@components/login/login';
import { RecaptchaModule } from 'ng-recaptcha';
import { RequestRecoverPasswordContainer } from '@containers/request-recover-password/request-recover-password';
import { RecoverPasswordContainer } from '@containers/recover-password/recover-password';
import { RequestRecoverPasswordComponent } from '@components/request-recover-password/request-recover-password';
import { RecoverPasswordComponent } from '@components/recover-password/recover-password';
import { UniversalInterceptor } from './interceptors/universal';
import { CartComponent } from '@components/cart/cart';
import { CartContainer } from '@containers/cart/cart';
import { ShippingAddressComponent } from '@components/shipping-address/shipping-address';
import { ShippingService } from './services/shipping';
import { ShippingState } from './states/shipping';
import { PaymentComponent } from './components/payment/payment';
import { PaymentState } from './states/payment';
import { PaymentService } from './services/payment';
import { OrderSummaryComponent } from './components/order-summary/order-summary';
import { AnomGuard } from '@guards/anom';

export function HttpLoaderFactory(http: HttpClient): TranslateHttpLoader {
  return new TranslateHttpLoader(http, `./assets/i18n/`, '.json');
}

@NgModule({
  imports: [
    BrowserModule.withServerTransition({ appId: 'metises-company-ecommerce' }),
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    FormsModule,
    SelectButtonModule,
    DropdownModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
    ProductDetailModule,
    SharedModule,
    RecaptchaModule,
    RouterModule
  ],
  declarations: [
    AppComponent,
    HomeContainer,
    HeaderComponent,
    LeftBarComponent,
    RightBarComponent,
    FooterComponent,
    UploadImageComponent,
    SearchContainer,
    showClientSide,
    ProfileContainer,
    ProfileComponent,
    SignupContainer,
    SignupComponent,
    LoginContainer,
    LoginComponent,
    CartComponent,
    CartContainer,
    ShippingAddressComponent,
    PaymentComponent,
    OrderSummaryComponent,
    RequestRecoverPasswordContainer,
    RequestRecoverPasswordComponent,
    RecoverPasswordContainer,
    RecoverPasswordComponent,
    CartComponent
  ],
  bootstrap: [AppComponent],
  providers: [
    ProductService,
    ProductsState,
    HttpErrorHandler,
    CategoryService,
    CategoryState,
    HttpService,
    HttpErrorHandler,
    CompanyState,
    CompanyService,
    GlobalDataService,
    GlobalDataState,
    UserService,
    UserState,
    MessageService,
    SessionService,
    CartService,
    CartState,
    ShippingService,
    ShippingState,
    PaymentState,
    PaymentService,
    { provide: HTTP_INTERCEPTORS, useClass: UniversalInterceptor, multi: true },
    AnomGuard,
    { provide: HTTP_INTERCEPTORS, useClass: UniversalInterceptor, multi: true },
    
  ],
})
export class AppModule {
    constructor(@Inject(PLATFORM_ID) private platformId: object, @Inject(APP_ID) private appId: string) {
        const platform = isPlatformBrowser(platformId) ? 'in the browser' : 'on the server';
        console.log(`Running ${platform} with appId=${appId}`);
    }
}
