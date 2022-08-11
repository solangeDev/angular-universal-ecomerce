export interface CategoryInterface {
  name: string;
  enabled: boolean;
  image: string;
  order: number;
  level: number;
  id: string;
  company: string;
  productsCount: number;
  parent?: string;
  children?: CategoryInterface[];
}

export interface CategoriesInterface {
  elementsTotal: number;
  elementsInPage: number;
  data: CategoryInterface[];
}