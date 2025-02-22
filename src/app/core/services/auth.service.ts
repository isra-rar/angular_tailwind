import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { LoginRequest, LoginResponse } from '../../models/auth.model';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { ApiResponse } from '../../models/api-response.model';
import { Router } from '@angular/router';
import { LocalStorageService } from './local-storage.service';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private http = inject(HttpClient);
  private router = inject(Router);
  private storage = inject(LocalStorageService);

  // criar um estado baseado no parametro - o parametro é se o existe token no local storage ou nao
  private isAuthenticatedSubject = new BehaviorSubject<boolean>(this.hasToken());

  // isso torna o estado um observable onde qualquer pessoa possa subscriber ele
  isAuthenticated$ = this.isAuthenticatedSubject.asObservable();

  private hasToken(): boolean {
    // !! convert null ou undefined para false
    return !!this.storage.getItem('token');
  }

  login(credentials: LoginRequest): Observable<ApiResponse<LoginResponse>> {
    return this.http.post<ApiResponse<LoginResponse>>(`${environment.api.auth}/login`, credentials).pipe(
      tap((res) => {
        this.storage.setItem('token', res.data.token);
        this.isAuthenticatedSubject.next(true);
      })
    );
  }

  logout(): void {
    this.storage.removeItem('token');
    this.isAuthenticatedSubject.next(false);
    this.router.navigate(['/login']);
  }
}
