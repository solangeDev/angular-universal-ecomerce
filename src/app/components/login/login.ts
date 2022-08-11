import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CompanyInterface } from '@app/models/company';
import { CompanyService } from '@app/services/company';
import { UserService } from '@app/services/user';
import { TranslateService } from '@ngx-translate/core';
import { RecaptchaComponent } from 'ng-recaptcha';
import { MessageService } from 'primeng/api';
import { JwtHelperService } from '@auth0/angular-jwt';

@Component({
  selector: 'app-login',
  templateUrl: './login.html',
  styleUrls: ['./login.scss'],
})
export class LoginComponent implements OnInit {
  helper = new JwtHelperService();
  public form: FormGroup;
  public errorMessage: string;
  public company: CompanyInterface;
  public isSent = false;
  @ViewChild('captchaRef') captchaRef: RecaptchaComponent;
  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private router: Router,
    private messageService: MessageService,
    private translateService: TranslateService,
    private companyService: CompanyService
  ) {}

  ngOnInit(): void {
    this.loadDataCompany();
    this.translateService.get('signup-error').subscribe((message) => (this.errorMessage = message));
    this.buildForm();
  }

  get formControl() {
    return this.form.controls;
  }

  buildForm(): void {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
  }

  validateRecaptcha(): void {
    this.isSent = true;
    this.captchaRef.execute();
  }

  onSubmit(recaptchaToken: string): void {
    this.userService.sign(this.form.value, recaptchaToken).subscribe(
      (res: string) => {
        this.router.navigate(['/']);
        
      },
      (error: any) => {
        this.messageService.add({ severity: 'danger', summary: this.errorMessage, detail: error });
      }
    );
  }

  resolved(captchaResponse: string): void {
    this.onSubmit(captchaResponse);
  }

  loadDataCompany(): void {
    this.companyService.getCompany().subscribe((data) => {
      this.company = data;
    });
  }
}
