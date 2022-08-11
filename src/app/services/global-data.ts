import { HttpService } from '@services/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';
import { GlobalDataState } from '@states/global-data';

@Injectable()
export class GlobalDataService {
  constructor(private http: HttpService, private globalDataState: GlobalDataState) {}

  getGlobalData() {
    return this.globalDataState.getGlobalData();
  }
}
