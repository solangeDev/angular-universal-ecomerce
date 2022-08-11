import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { CompanyInterface } from '../models/company';

@Injectable()
export class CompanyState {
  private company$ = new BehaviorSubject<CompanyInterface>({
    name: 'company',
    logo: 'https://firebasestorage.googleapis.com/v0/b/metises-com.appspot.com/o/favicon.ico?alt=media&token=523ea150-248e-46de-bf87-3e22eee8f57f',
  });
  get companyData(): CompanyInterface {
    return this.company$.value;
  }

  setCompany(data: CompanyInterface): void {
    this.company$.next(data);
  }

  getCompany(): Observable<CompanyInterface> {
    return this.company$.asObservable();
  }
}
