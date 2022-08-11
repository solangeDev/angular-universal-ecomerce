import { Component } from '@angular/core';
import {AppComponent} from "@app/app.component";

@Component({
  selector: 'app-profile-container',
  templateUrl: './profile.html',
  styleUrls: ['./profile.scss']
})
export class ProfileContainer{

  constructor(private app: AppComponent) {
    app.hideProductList();
    app.hideRightBar();
  }

}
