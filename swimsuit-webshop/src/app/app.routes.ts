import { Routes } from '@angular/router';
import {ProductsComponent} from "./pages/products/products.component";
import {LoginComponent} from "./pages/login/login.component";
import {RegistrationComponent} from "./pages/registration/registration.component";
import {authGuard} from "./shared/services/auth.guard";

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'products',
    component: ProductsComponent,
    canActivate : [authGuard]
  },

  {
    path: 'registration',
    component: RegistrationComponent
  },
];
