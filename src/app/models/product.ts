export interface ProductInterface {
  id: string;
  subsidiary: string;
  code: string;
  name: string;
  description: string;
  availableForDelivery: boolean;
  enabled: boolean;
  productDetails?: ProductDetailInterface;
  price: number;
  quantity: number;
  category?: CategoryInterface;
  isForsale: boolean;
  measurementUnit: string;
  images?: [];
  discontinued: boolean;
  fixedAsset: boolean;
  publish: boolean;
  variationValues?: [];
  appliedModifiers: [] | appliedModifiersInterface[];
  inventoryStatus: '' | 'stock' | 'outofstock';
}

export interface ProductDetailInterface {
  width: string;
  height: string;
  depth: string;
  weight: string;
  color?: string;
  brand: string;
  model: string;
}

export interface appliedModifiersInterface {
  name: string;
  operation: string;
  type: string;
  value: number;
  isTax: boolean;
}

export interface ProductsInterface {
  elementsTotal: number;
  elementsInPage: number;
  data: ProductInterface[];
}

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
