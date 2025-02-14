import { Component, OnInit } from '@angular/core';
import { LoginRequest } from '../../models/auth.model';
import { Router } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule, Location } from '@angular/common';
import { ButtonGoogleComponent } from '../../components/button-google/button-google.component';
import { CreateAccountComponent } from '../create-account/create-account.component';
import { StatePropsService } from '../../core/services/state-props.service';
import { AuthGoogleServicesService } from '../../core/services/auth-google-services.service';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, CommonModule, ButtonGoogleComponent, CreateAccountComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {

  isLoginMode: boolean | undefined;

  credentials: LoginRequest = { username: '', password: '' };

  constructor(private router: Router, private authService: AuthService, private state: StatePropsService, private googleService: AuthGoogleServicesService) {}

  ngOnInit(): void {
    this.state.isLoginMode$.subscribe((mode: boolean) => {
      this.isLoginMode = mode;
    });
  }

  toggleModeCreate() {
    this.isLoginMode = !this.isLoginMode;
  }

  onSubmit() {
    this.authService.login(this.credentials).subscribe({
      next: (res) => {
        console.log('res ==> ', res);
        this.router.navigate(['/home']);
      },
      error: (error) => {
        console.log('error ==> ', error);
      },
    });
  }


  loginWithGoogle() {
    this.googleService.loginWithGoogle();
  }
  
}
