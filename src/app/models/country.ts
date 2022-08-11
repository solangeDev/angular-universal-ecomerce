import { CityInterface } from '@models/city';

export interface CountryInterface {
  name: string;
  iso2: string;
  lat: string;
  lng: string;
  cities: CityInterface[];
}
