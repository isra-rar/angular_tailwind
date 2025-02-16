import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../../core/services/user.service';
import { StatePropsService } from '../../core/services/state-props.service';
import { ButtonGoogleComponent } from '../../components/button-google/button-google.component';
import { AuthGoogleService } from '../../core/services/auth-google-services.service';

@Component({
  selector: 'app-create-account',
  standalone: true,
  imports: [ReactiveFormsModule, ButtonGoogleComponent],
  templateUrl: './create-account.component.html',
  styleUrl: './create-account.component.scss'
})
export class CreateAccountComponent {

  private userService = inject(UserService);
  private router = inject(Router);
  private state = inject(StatePropsService);
  private googleService = inject(AuthGoogleService);
  private fb = inject(FormBuilder);

  showPassword: boolean = false;
  public createNewAccount!: FormGroup;

  constructor() {
    this.createNewAccount = this.fb.group({
      firstName: ['', [Validators.required, Validators.minLength(3)]],
      lastName: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      username: ['', [Validators.required, Validators.minLength(6)]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      passwordConfirm: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  changeToLoginMode() {
    this.state.setLoginMode(true);
  }

  togglePassword() {
    this.showPassword = !this.showPassword;
  }

  onSubmit() {
    if (this.createNewAccount.valid) {
      this.userService.createUser(this.createNewAccount.value).subscribe({
        next: () => {
          this.router.navigate(['/home']);
        },
        error: (error) => {
          console.log('error ==> ', error);
        },
      });
    } else {
      console.log('Formulário inválido!', this.createNewAccount.errors);
    }
  }

  loginWithGoogle() {
    this.googleService.loginWithGoogle();
  }
}
