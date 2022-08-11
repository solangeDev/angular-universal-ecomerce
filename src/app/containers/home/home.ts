import { Component } from '@angular/core';
import { environment } from '@environments/environment';
import { SeoService } from "@services/seo";
import {AppComponent} from "@app/app.component";

@Component({
  selector: 'app-home-container',
  templateUrl: './home.html',
  styleUrls: [ './home.scss' ]
})
export class HomeContainer {

  public seoTitle: string = environment.seoTitle;
  
  constructor(private app: AppComponent, private seoService: SeoService) {
    app.showAll();
    const content = 'Somos un Ecommerce para que vendas los productos de tu compañia';
    this.seoService.setMetaTitle(this.seoTitle);
    this.seoService.setMetaDescription(content);
  }
}
