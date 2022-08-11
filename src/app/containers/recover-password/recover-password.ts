import { Component, } from '@angular/core';
import { AppComponent } from '@app/app.component';

@Component({
    selector: 'app-recover-password-container',
    templateUrl: './recover-password.html'
})
export class RecoverPasswordContainer {

    constructor(private app: AppComponent) {
        app.hideAll();
    }
}
