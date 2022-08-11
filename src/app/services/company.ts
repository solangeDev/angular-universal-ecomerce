import { HttpService } from '@services/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';
import { CompanyState } from '@states/company';

@Injectable()
export class CompanyService {
  constructor(private http: HttpService, private companyState: CompanyState) {}

  getCompany() {
    return this.companyState.getCompany();
  }
}
