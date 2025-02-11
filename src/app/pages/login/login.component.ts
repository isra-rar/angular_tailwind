import { Component } from '@angular/core';
import { LoginRequest } from '../../models/auth.model';
import { Router } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  credentials: LoginRequest = { username: '', password: '' };

  constructor(private router: Router, private authService: AuthService) {}

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
}
