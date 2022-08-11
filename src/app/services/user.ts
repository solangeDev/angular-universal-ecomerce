import { HttpService } from '@services/http';
import { Inject, Injectable, PLATFORM_ID, StaticProvider } from '@angular/core';
import { ForgotPasswordRecoverRequestType, ForgotPasswordRequestType, UserInterface } from '@models/user';
import { UpdatedResponseInterface } from '@models/service';
import { tap } from 'rxjs/operators';
import { UserState } from '@states/user';
import { isPlatformBrowser } from '@angular/common';
import { Observable } from 'rxjs';
import { SessionService } from './session';
import { Router } from '@angular/router';
import { userInfo } from 'os';
import { CartService } from './cart';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable()
export class UserService {
  helper = new JwtHelperService();
  readonly ENDPOINT = `users`;
  readonly AUTH_ENDPOINT = `tokens?recaptchaToken=`;
  readonly FORGOT_PASSWORD_ENDPOINT = `forgot-password/`;
  CUSTOMERS = `customers/[customerid]`;

  constructor(
    private userState: UserState,
    @Inject(PLATFORM_ID) private platformId: StaticProvider[],
    private http: HttpService,
    private sessionService: SessionService,
    private router: Router,
    private cartService: CartService
  ) {}

  get isLoggedIn(): boolean {
    return !!this.sessionService.getItem('met');
  }
  
  getUser() {
    return this.userState.getUser();
  }

  updateUser(data: any, id: string): Observable<UpdatedResponseInterface> {
    try {
      return this.http.put(`${this.ENDPOINT}/${id}`, data);
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  validateAnomCart(): void {
    let cartStorage = this.cartService.getCartLocalStorage();
    if (cartStorage.length > 0) {
      this.cartService.loadSaleQuote('ecommerce').subscribe((response) => {
        response.items = cartStorage;
        this.cartService.addSaleQuote(response);
      });
      this.cartService.clearCartLocalStorage();
    }
  }

  loadUser(tokenDecode: any) {
    this.CUSTOMERS = this.CUSTOMERS.replace('[customerid]', tokenDecode.sub);
    return this.http.get(`${this.CUSTOMERS}`).pipe(
      tap((response) => {
        this.setUser(JSON.stringify(response));
        this.userState.setUser(response);
      })
    );
  }

  sign(userData: UserInterface, captchaResponse: string): Observable<string> {
    try {
      return this.http.post(`${this.AUTH_ENDPOINT}${captchaResponse}`, userData).pipe(
        tap((res: string) => {
          // @ts-ignore
          this.setToken(res.token);
          this.validateAnomCart();
        })
      );
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  setToken(data: string): void {
    this.sessionService.setItem('met', JSON.stringify(data));
    // @ts-ignore
    const decoded = this.helper.decodeToken(data);
    this.loadUser(decoded).subscribe();
  }

  setUser(userData: any): void {
    this.sessionService.setItem('meu', userData);
  }
  
  logout(): void {
    this.sessionService.deleteItem('met');
    this.sessionService.deleteItem('meu');
    this.router.navigate(['login']);
  }

  forgotPassword(data: ForgotPasswordRequestType, recaptchaToken: string): Observable<ForgotPasswordRequestType> {
    try {
      return this.http.post(`${this.FORGOT_PASSWORD_ENDPOINT}request`, { ...data, token: recaptchaToken });
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  forgotPasswordRecover(data: ForgotPasswordRecoverRequestType): Observable<ForgotPasswordRecoverRequestType> {
    try {
      return this.http.post(`${this.FORGOT_PASSWORD_ENDPOINT}recover`, data);
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}
