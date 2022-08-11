import { HttpService } from '@services/http';
import { Injectable } from '@angular/core';
import { CategoriesInterface } from '@models/category';
import { tap } from 'rxjs/operators';
import { CategoryState } from '@states/category';

@Injectable()
export class CategoryService {
  readonly ENDPOINT_CATEGORIES = `categories`;
  constructor(private http: HttpService, private categoryState: CategoryState) {}
  
  loadCategories() {
    return this.http.get(`${this.ENDPOINT_CATEGORIES}`).pipe(
      tap((response: CategoriesInterface ) => {
        this.categoryState.setCategories(response.data);
      })
    );
  }

  getCategories(){
    return this.categoryState.getCategories();
  }

}
