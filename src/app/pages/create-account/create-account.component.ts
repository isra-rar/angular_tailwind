import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../../core/services/user.service';

@Component({
  selector: 'app-create-account',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './create-account.component.html',
  styleUrl: './create-account.component.scss'
})
export class CreateAccountComponent {

  showPassword: boolean = false;
  public createNewAccount!: FormGroup; // Apenas a declaração da variável

  constructor(private fb: FormBuilder, private userService: UserService, private router: Router) {
    this.createNewAccount = this.fb.group({
      firstName: ['', [Validators.required, Validators.minLength(3)]],
      lastName: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      username: ['', [Validators.required, Validators.minLength(6)]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      passwordConfirm: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  togglePassword() {
    console.log(this.showPassword)
    this.showPassword = !this.showPassword;
  }

  onSubmit() {
    if (this.createNewAccount.valid) {
      console.log("Formulário válido!", this.createNewAccount.value);
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
}
