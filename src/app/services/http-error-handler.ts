import { Inject, Injectable, PLATFORM_ID, StaticProvider } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { isPlatformBrowser } from '@angular/common';

export type HandleError = <T>(
  operation?: string,
  result?: T
) => (error: HttpErrorResponse) => Observable<HttpErrorResponse>;

@Injectable()
export class HttpErrorHandler {
  constructor(@Inject(PLATFORM_ID) private platformId: StaticProvider[]) {}
  
  /** Create curried handleError function that already knows the service name */
  createHandleError = (serviceName = '') => {
    return <T>(operation = 'operation', result = {} as T) => this.handleError(serviceName, operation, result);
  };

  /**
   * Returns a function that handles Http operation failures.
   * This error handler lets the app continue to run as if no error occurred.
   * @param serviceName = name of the data service that attempted the operation
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  handleError<T>(serviceName = '', operation = 'operation', result = {} as T) {
    return (error: HttpErrorResponse): Observable<HttpErrorResponse> => {
      // TODO: send the error to remote logging infrastructure
        console.error('ERROR HTTP- handleError')
        return of(error);
    };
  }
}
