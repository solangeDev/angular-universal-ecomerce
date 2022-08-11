import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CompanyInterface } from '@app/models/company';
import { ForgotPasswordRecoverRequestType } from '@app/models/user';
import { CompanyService } from '@app/services/company';
import { UserService } from '@app/services/user';
import { TranslateService } from '@ngx-translate/core';
import { MessageService } from 'primeng/api';

@Component({
    selector: 'app-recover-password',
    templateUrl: './recover-password.html',
    styleUrls: ['./recover-password.scss']
})
export class RecoverPasswordComponent implements OnInit {
    public form: FormGroup;
    public errorMessage: string;
    public company: CompanyInterface;
    public token: string;
    public isSent = false;
    constructor(private fb: FormBuilder, private userService: UserService, private router: Router,
        private messageService: MessageService, private translateService: TranslateService, private companyService: CompanyService, private route: ActivatedRoute) { }

    ngOnInit(): void {
        this.token = this.route.snapshot.params['token'];
        this.loadDataCompany();
        this.translateService.get("signup-error").subscribe((message) => this.errorMessage = message);
        this.buildForm()
    }

    get formControl() {
        return this.form.controls;
    }

    buildForm(): void {
        this.form = this.fb.group({
            password: ['', [Validators.required, Validators.minLength(8), Validators.pattern(
                /(?=.*[a-z])(?=.*[A-Z])(?=.*[@$!%*#?&^_-]).{8,}/
            )]],
            confirmedPassword: ['', [Validators.required, Validators.minLength(8), Validators.pattern(
                /(?=.*[a-z])(?=.*[A-Z])(?=.*[@$!%*#?&^_-]).{8,}/
            )]],
        });
    }

    onSubmit(): void {
        const data: ForgotPasswordRecoverRequestType = { ...this.form.value, token: this.token }
        this.userService.forgotPasswordRecover(data).subscribe((resp) => {
            this.isSent = true;
        }, (error) => {
            this.router.navigate(['/recover-password'])
            this.messageService.add({ severity: 'danger', summary: this.errorMessage, detail: error });
        })
    }

    loadDataCompany(): void {
        this.companyService.getCompany().subscribe((data) => {
            this.company = data;
        });
    }

    handleChangePassword(e: Event): void {
        const value = (e.target as HTMLInputElement).value;
        if (this.form.controls['password'].value.length > 0 && this.form.controls['password'].value !== value && this.form.controls['confirmedPassword'].value) {
            this.form.get('confirmedPassword')?.setErrors({ incorrect: true });
        } else {
            this.form.get('confirmedPassword')?.setErrors(null);
        }
    }
}
