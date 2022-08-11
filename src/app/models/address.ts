export interface AddressInterface {
  id?: string;
  name: string;
  address: string;
  city: string;
  country: string;
  latitude: string;
  longitude: string;
  isPrimary: boolean;
}

export class Address implements AddressInterface {
  constructor(
    public name = '',
    public address = '',
    public city = '',
    public country = '',
    public longitude = '',
    public latitude = '',
    public isPrimary = false
  ) {}
}
