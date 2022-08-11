import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { UserInterface, User } from '../models/user';

@Injectable()
export class UserState {
  private user$ = new BehaviorSubject<UserInterface>(new User());
  get userData(): UserInterface {
    return this.user$.value;
  }

  setUser(data:  any): void {
    this.user$.next(data);
  }

  getUser(): Observable<UserInterface> {
    return this.user$.asObservable();
  }
}
