import { Component, } from '@angular/core';
import { AppComponent } from '@app/app.component';

@Component({
    selector: 'app-signup-container',
    templateUrl: './signup.html'
})
export class SignupContainer {

    constructor(private app: AppComponent) {
        app.hideAll();
    }
}
