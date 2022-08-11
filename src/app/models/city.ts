export interface CityInterface {
  city: string;
  lat: string;
  lng: string;
  country: string;
  iso2: string;
}

export class City implements CityInterface {
  constructor(
    public city = '',
    public lat = '',
    public lng = '',
    public country = '',
    public iso2 = ''
  ) {}
}
