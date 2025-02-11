import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { CreateAccountComponent } from './pages/create-account/create-account.component';
import { HomeComponent } from './pages/home/home.component';

export const routes: Routes = [
  { path: '',  component: LoginComponent },
  { path: 'create-account', component: CreateAccountComponent },
  { path: 'home', component: HomeComponent },
  { path: '**', redirectTo: '', pathMatch: 'full' }
];
