import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Address, AddressInterface } from '@app/models/address';
import { CountryInterface } from '@app/models/country';
import {City, CityInterface }from '@app/models/city';
import { OptionInterface } from '@app/models/form';
import { ShippingService } from '@app/services/shipping';
import { response } from 'express';

@Component({
  selector: 'app-shipping-address',
  templateUrl: './shipping-address.html',
  styleUrls: ['./shipping-address.scss'],
})
export class ShippingAddressComponent implements OnInit {
  address: AddressInterface = new Address();
  addresses: AddressInterface[] = [];
  form!: FormGroup;
  submitted = false;
  active = false;
  dataCountries: CountryInterface[] = [];
  countriesOptions: OptionInterface[] = [];
  citiesOptions: OptionInterface[] = [];
  action: 'create' | 'update';

  constructor(private shippingService: ShippingService, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.loadAddresses();
    this.loadCountries();
    this.form = this.fb.group({
      name: ['', [Validators.required]],
      address: ['', [Validators.required]],
      country: [null, [Validators.required]],
      city: [null, [Validators.required]],
    });
  }

  get formControl() {
    return this.form.controls;
  }

  loadCountries() {
    this.shippingService.loadCities().subscribe((response) => {
      this.dataCountries = response;
      this.countriesOptions = response.map((item: any) => {
        return { name: item.name, code: item.name };
      });
    });
  }

  loadAddresses() {
    this.shippingService.getAddresses().subscribe((response) => {
      this.addresses = response;
    });
  }

  close() {
    this.active = false;
  }

  loadDataForm(data: AddressInterface) {
    this.action = 'update';
    this.address = data;
    const countries: CountryInterface[] = this.dataCountries.filter((item: any) => {
      if (item.name === data.country) {
        return item;
      }
    });
    if (countries.length > 0) {
      this.citiesOptions = countries[0].cities.map((item: any) => {
        return { name: item.city, code: item.city };
      });
    }
    this.form = this.fb.group({
      name: [data.name, [Validators.required]],
      address: [data.address, [Validators.required]],
      country: [{ name: data.country, code: data.country }, [Validators.required]],
      city: [{ name: data.city, code: data.city }, [Validators.required]],
    });
  }

  open(data: AddressInterface) {
    this.loadDataForm(data);
    this.active = !this.active;
  }

  validateAllFormFields(formGroup: FormGroup): void {
    Object.keys(formGroup.controls).forEach((field) => {
      const control = formGroup.get(field);
      if (control instanceof FormControl) {
        control.markAsTouched({ onlySelf: true });
      } else if (control instanceof FormGroup) {
        this.validateAllFormFields(control);
      } else if (control instanceof FormArray) {
        control.controls.forEach((a: any) => {
          this.validateAllFormFields(a);
        });
      }
    });
  }

  newAddress() {
    this.action = 'create';
    this.active = true;
    this.citiesOptions = [];
    this.form = this.fb.group({
      name: ['', [Validators.required]],
      address: ['', [Validators.required]],
      country: [null, [Validators.required]],
      city: [null, [Validators.required]],
    });
  }

  loadCitiesForm(e: { value: OptionInterface }) {
    const value = e.value;
    this.citiesOptions = [];
    const countries: CountryInterface[] = this.dataCountries.filter((item: any) => {
      if (item.name === value.name) {
        return item;
      }
    });
    if (countries.length > 0) {
      this.citiesOptions = countries[0].cities.map((item: any) => {
        return { name: item.city, code: item.city };
      });
    }
  }

  updateAddress(data: any) {
    const address: AddressInterface = {
      id: this.address.id,
      name: data.name,
      address: data.address,
      country: data.country.name,
      city: data.city.name,
      isPrimary: this.address.isPrimary,
      latitude: '',
      longitude: '',
    };
    const country: CountryInterface[] = this.dataCountries.filter((item: any) => {
      if (item.name === address.country) {
        return item;
      }
    });
    if (country.length > 0) {
      address.latitude = country[0].lat;
      address.longitude = country[0].lng;
    }
    this.shippingService.editToAddress(address, 'ecommerce').subscribe((response) => {
      this.active = false;
    });
  }

  createAddress(data: any) {
    const address: AddressInterface = {
      name: data.name,
      address: data.address,
      country: data.country.name,
      city: data.city.name,
      isPrimary: false,
      latitude: '',
      longitude: '',
    };
    const country: CountryInterface[] = this.dataCountries.filter((item: any) => {
      if (item.name === address.country) {
        return item;
      }
    });
    if (country.length > 0) {
      address.latitude = country[0].lat;
      address.longitude = country[0].lng;
    }
    this.shippingService.addToAddress(address, 'ecommerce').subscribe((response) => {
      address.id = response.id;
      this.active = false;
      this.shippingService.addToItem(address);
    });
  }

  remove(data: AddressInterface) {
    this.shippingService.deleteToAddress(data, 'ecommerce').subscribe((response) => {});
  }

  setIsPrimaryAddress(data: AddressInterface) {
    data.isPrimary = !this.address.isPrimary;
    this.shippingService.setIsPrimaryAddress(data, 'ecommerce').subscribe((response) => {});
  }

  onSubmit(): void {
    if (this.form.valid) {
      this.submitted = true;
      switch (this.action) {
        case 'create':
          this.createAddress(this.form.value);
          break;
        case 'update':
          this.updateAddress(this.form.value);
          break;
      }
    } else {
      this.submitted = false;
      this.validateAllFormFields(this.form);
    }
  }
}
