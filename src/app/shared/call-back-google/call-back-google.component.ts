import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { CommonModule } from '@angular/common';
import { first, take } from 'rxjs';
import { LocalStorageServiceService } from '../../core/services/local-storage-service.service';

@Component({
  selector: 'app-call-back-google',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './call-back-google.component.html',
  styleUrl: './call-back-google.component.scss'
})
export class CallBackGoogleComponent implements OnInit, OnDestroy {

  loading: boolean = false;
  error: string | null = null;
  private subscription: any;

  constructor(
    private route: ActivatedRoute,
    private authService: AuthService,
    private router: Router,
    private localStorageService: LocalStorageServiceService
  ) {}

  ngOnInit(): void {
    this.loading = true;
    const token = this.localStorageService.getItem('token')
    if (token) {
      this.router.navigate(['/home']);
    } else {
      this.processQueryParams();
    }
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }

  private processQueryParams(): void {
    this.subscription = this.route.queryParams.pipe(first()).subscribe(params => {
      const code = params['code'];

      if (code) {
        this.exchangeCodeForToken(code);
      } else {
        this.setErrorAndStopLoading('Código de autenticação não encontrado ou já utilizado');
      }
    });
  }

  private exchangeCodeForToken(code: string): void {
    this.authService.exchangeCodeForToken(code).pipe(take(1)).subscribe({
      next: (res) => {
        if (typeof window !== 'undefined') {
          this.localStorageService.setItem('token', res.token);
        }
        this.router.navigate(['/home']); 
      },
      error: () => {
        this.setErrorAndStopLoading('Falha ao autenticar. Tente novamente.');
        this.router.navigate(['/login']); 
      },
      complete: () => {
        this.loading = false;
      }
    });
  }

  private setErrorAndStopLoading(message: string): void {
    this.error = message;
    this.loading = false;
  }
}
