import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {PDPContainer} from "@containers/pdp/pdp";

const routes: Routes = [
    {
        path: '',
        component: PDPContainer
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class ProductDetailRoutingModule {
}
