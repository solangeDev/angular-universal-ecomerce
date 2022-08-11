import {Injectable} from "@angular/core";
import {BehaviorSubject, Observable} from "rxjs";
import { CategoryInterface } from '../models/category';

@Injectable()
export class CategoryState {
  private categories$ = new BehaviorSubject<CategoryInterface[]>([]);
  get CategoriesData(): CategoryInterface[] { return this.categories$.value; }

  setCategories(categories: CategoryInterface[]):void {
   this.categories$.next(categories);
  }

  getCategories():Observable<CategoryInterface[]> {
    return this.categories$.asObservable();
  }

}
