import {Injectable} from '@angular/core';
import {CanActivate, Router} from '@angular/router';
import {SessionService} from '@app/services/session';
import {UserService} from '@app/services/user';
import {Observable} from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class AnomGuard implements CanActivate {
  constructor(private userService: UserService, private router: Router, private sessionService: SessionService) { };
  canActivate(): Observable<boolean> | Promise<boolean> | boolean {
    let isLoggedIn = this.userService.isLoggedIn;
    return isLoggedIn ? (this.router.navigateByUrl('/'), false) : true
  }
}
