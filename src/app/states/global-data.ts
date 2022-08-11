import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { GlobalData } from '@models/global-data';

@Injectable()
export class GlobalDataState {
  private data$ = new BehaviorSubject<GlobalData>({
    links: [
      {
        name: 'Información de la empresa',
        href: '/companyInfo',
      },
      {
        name: 'Contactar',
        href: '/contactar ',
      },
      {
        name: 'Obtener ayuda',
        href: '/get-help ',
      },
      {
        name: 'Política de privacidad',
        href: '/privacy_policy',
      },
    ],
  });

  get globalData(): GlobalData {
    return this.data$.value;
  }

  getGlobalData(): Observable<GlobalData> {
    return this.data$.asObservable();
  }
}
