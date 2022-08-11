import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CompanyInterface } from '@app/models/company';
import { CompanyService } from '@app/services/company';
import { UserService } from '@app/services/user';
import { TranslateService } from '@ngx-translate/core';
import { RecaptchaComponent } from 'ng-recaptcha';
import { MessageService } from 'primeng/api';

@Component({
    selector: 'app-signup',
    templateUrl: './signup.html',
    styleUrls: ['./signup.scss']
})
export class SignupComponent implements OnInit {
    public form: FormGroup;
    public errorMessage: string;
    public showConfirmedPassword: boolean;
    public showPassword: boolean;
    public company: CompanyInterface;
    @ViewChild('captchaRef') captchaRef: RecaptchaComponent;
    constructor(private fb: FormBuilder, private userService: UserService, private router: Router,
        private messageService: MessageService, private translateService: TranslateService, private companyService: CompanyService) { }

    ngOnInit(): void {
        this.loadDataCompany();
        this.translateService.get("signup-error").subscribe((message) => this.errorMessage = message);
        this.buildForm();
    }

    get formControl() {
        return this.form.controls;
    }

    buildForm(): void {
        this.form = this.fb.group({
            name: ['', [Validators.required]],
            lastname: ['', [Validators.required]],
            email: ['', [Validators.required, Validators.email]],
            password: ['', [Validators.required, Validators.minLength(8), Validators.pattern(
                /(?=.*[a-z])(?=.*[A-Z])(?=.*[@$!%*#?&^_-]).{8,}/
            )]],
            confirmedPassword: ['', [Validators.required, Validators.minLength(8), Validators.pattern(
                /(?=.*[a-z])(?=.*[A-Z])(?=.*[@$!%*#?&^_-]).{8,}/
            )]],
        });
    }

    validateRecaptcha(): void {
        this.captchaRef.execute();
    }

    onSubmit(recaptchaToken: string): void {
        this.userService.sign(this.form.value, recaptchaToken).subscribe((res: string) => {
            this.router.navigate(['/']);
        }, (error: any) => {
            this.messageService.add({ severity: 'danger', summary: this.errorMessage, detail: error });
        })
    }

    handleChangePassword(e: Event): void {
        const value = (e.target as HTMLInputElement).value;
        if (this.form.controls['password'].value.length > 0 && this.form.controls['password'].value !== value && this.form.controls['confirmedPassword'].value) {
            this.form.get('confirmedPassword')?.setErrors({ incorrect: true });
        } else {
            this.form.get('confirmedPassword')?.setErrors(null);
        }
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
