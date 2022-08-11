import { Inject, Injectable, Injector, PLATFORM_ID } from '@angular/core';
import { isPlatformServer } from '@angular/common';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { REQUEST } from '@nguniversal/express-engine/tokens';

import { Request } from 'express';
import { Observable, EMPTY } from 'rxjs';

@Injectable()
export class UniversalInterceptor implements HttpInterceptor {
  constructor(private readonly injector: Injector, @Inject(PLATFORM_ID) private readonly platformId: any) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const isServer = isPlatformServer(this.platformId);

    if (!isServer) {
      return next.handle(request);
    } else {
      return EMPTY;
    }
  }
}
