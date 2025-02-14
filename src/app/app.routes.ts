import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { CreateAccountComponent } from './pages/create-account/create-account.component';
import { HomeComponent } from './pages/home/home.component';
import { CallBackGoogleComponent } from './shared/call-back-google/call-back-google.component';

export const routes: Routes = [
  { path: 'auth/callback', component: CallBackGoogleComponent },
  { path: '',  component: LoginComponent },
  { path: 'home', component: HomeComponent },
  { path: 'create-account', component: CreateAccountComponent },
  { path: '**', redirectTo: '', pathMatch: 'full' }
];
