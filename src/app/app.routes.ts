import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { CreateAccountComponent } from './pages/create-account/create-account.component';
import { HomeComponent } from './pages/home/home.component';
import { CallBackGoogleComponent } from './shared/call-back-google/call-back-google.component';
import { ClockPrayComponent } from './pages/clock-pray/clock-pray.component';
import { AuthGuard } from './core/guards/auth-guard.guard';

export const routes: Routes = [
  { path: 'auth/callback', component: CallBackGoogleComponent },
  { path: '',  component: LoginComponent },
  { path: 'clock-pray',  component: ClockPrayComponent },
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard]  },
  { path: 'create-account', component: CreateAccountComponent },
  { path: '**', redirectTo: '', pathMatch: 'full' }
];
