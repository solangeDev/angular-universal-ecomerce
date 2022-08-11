import { isPlatformBrowser } from '@angular/common';
import { Inject, Injectable, PLATFORM_ID, StaticProvider } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { SessionService } from '@app/services/session';
import { UserService } from '@app/services/user';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  helper = new JwtHelperService();
  isLoggedIn: boolean = false;
  constructor(
    public router: Router,
    private sessionService: SessionService,
    private userService: UserService,
    @Inject(PLATFORM_ID) private platformId: StaticProvider[]
  ) {
    if (isPlatformBrowser(this.platformId)) {
      console.log(this.userService.isLoggedIn, 'lalalla');
    }
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    let valid = false;

    const isLoggedIn = true;
    // console.log(this.userService.isLoggedIn, 'jajaja');
    // @ts-ignore
    if (isLoggedIn) {
      valid = true;
    } else {
      valid = false;
      this.router.navigate(['/login']);
    }

    return valid;
  }
}
