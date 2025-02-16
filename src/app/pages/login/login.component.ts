import { Component, inject, OnInit } from '@angular/core';
import { LoginRequest } from '../../models/auth.model';
import { Router } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule, Location } from '@angular/common';
import { ButtonGoogleComponent } from '../../components/button-google/button-google.component';
import { CreateAccountComponent } from '../create-account/create-account.component';
import { StatePropsService } from '../../core/services/state-props.service';
import { AuthGoogleService } from '../../core/services/auth-google-services.service';
import { LocalStorageService } from '../../core/services/local-storage.service';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, CommonModule, ButtonGoogleComponent, CreateAccountComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {

  private router = inject(Router);
  private authService = inject(AuthService);
  private state = inject(StatePropsService);
  private googleService = inject(AuthGoogleService);
  private storage = inject(LocalStorageService);

  isLoginMode: boolean | undefined;

  credentials: LoginRequest = { username: '', password: '' };

  ngOnInit(): void {
    if (!!this.storage.getItem('token')) {
      this.router.navigate(['/home'])
    }
    
    this.state.isLoginMode$.subscribe((mode: boolean) => {
      this.isLoginMode = mode;
    });
  }

  toggleModeCreate() {
    this.isLoginMode = !this.isLoginMode;
  }

  onSubmit() {
    this.authService.login(this.credentials).subscribe({
      next: () => this.router.navigate(['/home']),
      error: (error) => {
        console.log('error ==> ', error);
      },
    });
  }


  loginWithGoogle() {
    this.googleService.loginWithGoogle();
  }
  
}
