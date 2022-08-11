import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { UserInterface } from '@models/user';
import { UserService } from '@services/user';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.html',
  styleUrls: ['./profile.scss'],
})
export class ProfileComponent implements OnInit {
  form!: FormGroup;
  submitted = false;
  user: UserInterface;
  showPassword = false;
  showConfirmedPassword = false;
  image: File;

  constructor(private fb: FormBuilder, private userService: UserService) {}

  get formControl() {
    return this.form.controls;
  }

  ngOnInit(): void {
    this.form = this.fb.group({
      name: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: [''],
      confirmedPassword: [''],
    });
    this.loadUser();
  }

  getImage(data: any): void {
    this.image = data;
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

  handleChangePassword(e: Event): void {
    const value = (e.target as HTMLInputElement).value;
    if (this.form.controls['password'].value.length > 0 && this.form.controls['password'].value !== value) {
      this.form.get('confirmedPassword')?.setErrors({ incorrect: true });
    } else {
      this.form.get('confirmedPassword')?.setErrors(null);
    }
  }

  loadUser(): void {
    this.userService.getUser().subscribe((data) => {
      this.user = data;
      this.form.patchValue(data);
    });
  }

  showPasswordValue(option: string) {
    switch (option) {
      case 'password':
        this.showPassword = !this.showPassword;
        break;
      case 'confirmedPassword':
        this.showConfirmedPassword = !this.showConfirmedPassword;
        break;
      default:
        break;
    }
  }

  compareDataUser() {
    let data: String[] = [];
    const user = { ...this.user };
    Object.keys(this.form.value).forEach((item: string) => {
      // @ts-ignore
      if (user[item] !== this.form.get(item)?.value) {
        if (this.form.get(item)?.value.length > 0) {
          data.push(item);
        }
      }
    });
    const myForm = new Object();
    if (data.length > 0) {
      data.forEach((item) => {
        // @ts-ignore
        myForm[item] = this.form.controls[item].value;
      });
    }
    return myForm;
  }

  onSubmit(): void {
    if (this.form.valid) {
      const data = this.compareDataUser();
      if (Object.keys(data).length > 0) {
        this.submitted = true;
        this.userService.updateUser(data, this.user.id).subscribe(() => console.log('HTTP request completed.'));
      }
    } else {
      this.submitted = false;
      this.validateAllFormFields(this.form);
    }
  }
}
