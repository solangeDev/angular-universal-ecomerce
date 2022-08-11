import { Injectable } from '@angular/core';

@Injectable()
export class SessionService {

  setItem<T>(key: string, value: T): void {
    localStorage.setItem(key, JSON.stringify(value));
  }

  getItem<T>(key: string, parse = true): T | null {
    const item = localStorage.getItem(key);
    return item && parse ? JSON.parse(item) : item;
  }

  deleteItem(key: string): void {
    return localStorage.removeItem(key);
  }

}
