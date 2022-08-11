import { Component, } from '@angular/core';
import { AppComponent } from '@app/app.component';

@Component({
    selector: 'app-login-container',
    templateUrl: './login.html'
})
export class LoginContainer {

    constructor(private app: AppComponent) {
        app.hideAll();
    }
}
