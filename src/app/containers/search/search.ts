import {Component} from "@angular/core";
import {ActivatedRoute} from "@angular/router";
import {environment} from "@environments/environment";
import {SeoService} from "@services/seo";
import {AppComponent} from "@app/app.component";

@Component({
    selector: "app-search-container",
    templateUrl: "./search.html",
    styleUrls: ["./search.scss"],
})
export class SearchContainer {

    public keyword: string;
    public seoTitle: string = environment.seoTitle;

    constructor(
        private app: AppComponent,
        private seoService: SeoService,
        private route: ActivatedRoute,
    ) {
        app.showAll();
        this.keyword = this.route.snapshot.params['keyword'];
        const content = `${this.seoTitle} - Resultados de busqueda de ${this.keyword}`;
        const title = !this.keyword ? `${this.seoTitle}` : `${this.keyword} | ${this.seoTitle}`;
        this.seoService.setMetaTitle(title);
        this.seoService.setMetaDescription(content);
    }
}
