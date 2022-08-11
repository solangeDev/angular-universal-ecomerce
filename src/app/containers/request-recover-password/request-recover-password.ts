import { Component, } from '@angular/core';
import { AppComponent } from '@app/app.component';

@Component({
    selector: 'app-request-recover-password-container',
    templateUrl: './request-recover-password.html'
})
export class RequestRecoverPasswordContainer {

    constructor(private app: AppComponent) {
        app.hideAll();
    }
}
