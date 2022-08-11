import { HttpClient } from '@angular/common/http';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import {HandleError, HttpErrorHandler} from "./http-error-handler";
import { environment as env } from '@environments/environment';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  private handleError: HandleError;
  private isBrowser: boolean;
  constructor(
    private http: HttpClient,
    httpErrorHandler: HttpErrorHandler,
    @Inject(PLATFORM_ID) private _platformId: Object
  ) {
    this.handleError = httpErrorHandler.createHandleError('HttpService');
    this.isBrowser = isPlatformBrowser(this._platformId);
  }

  getApiUrl(): string{
    const apiUrl = this.isBrowser && localStorage.getItem('environment');
    return 'test' === apiUrl ? env.apiTestUrl : env.apiProdUrl;

  }

  get(endpoint:string): Observable<any> {
    return this.http.get<any>(`${this.getApiUrl()}/${endpoint}`).pipe(
      catchError(this.handleError(`get${endpoint}`, []))
    );
  }

  post(endpoint: string, data: any = null): Observable<any> {
    return this.http.post<any>(`${this.getApiUrl()}/${endpoint}`, data)
      .pipe(
        catchError(this.handleError(`post${endpoint}`, data))
      );
  }

  put(endpoint: string, data: any): Observable<any> {
    return this.http.put<any>(`${this.getApiUrl()}/${endpoint}`, data)
      .pipe(
        catchError(this.handleError(`put${endpoint}`, data))
      );
  }

  delete(endpoint: string, data = null): Observable<any> {
    return this.http.delete(`${this.getApiUrl()}/${endpoint}`)
      .pipe(
        catchError(this.handleError(`delete${endpoint}`))
      );
  }

  patch(endpoint: string, data: any = null): Observable<any> {
    return this.http.patch<any>(`${this.getApiUrl()}/${endpoint}`, data)
      .pipe(
        catchError(this.handleError(`post${endpoint}`, data))
      );
  }

}
