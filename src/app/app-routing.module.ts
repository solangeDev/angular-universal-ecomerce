import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeContainer } from '@containers/home/home';
import { ProfileContainer } from '@containers/profile/profile';
import { SearchContainer } from '@containers/search/search';
import { CartContainer } from './containers/cart/cart';
import { LoginContainer } from './containers/login/login';
import { ProductDetailModule } from "@modules/product-detail.module";
import { RecoverPasswordContainer } from '@containers/recover-password/recover-password';
import { RequestRecoverPasswordContainer } from '@containers/request-recover-password/request-recover-password';
import { SignupContainer } from '@containers/signup/signup';
import { AnomGuard } from './guards/anom';
import { AuthGuard } from './guards/auth';

const routes: Routes = [
  {
    path: '',
    component: HomeContainer,
  },
  {
    path: 'search/:keyword',
    component: SearchContainer,
  },
  {
    path: 'product/:keyword',
    loadChildren: () => {
      return ProductDetailModule;
    },
  },
  { path: 'cart', component: CartContainer,  canActivate: []},
  { path: 'profile', component: ProfileContainer,  canActivate: [AuthGuard]},
  { path: 'login', component: LoginContainer,  canActivate: [AnomGuard]},
  { path: 'signup', component: SignupContainer, canActivate:[AnomGuard]},
  { path: 'request-recover-password', component: RequestRecoverPasswordContainer, canActivate:[AnomGuard]},
  { path: 'recover-password/:token', component: RecoverPasswordContainer, canActivate:[AnomGuard]},
  {
    path: '**',
    component: HomeContainer,
    redirectTo: ''
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
