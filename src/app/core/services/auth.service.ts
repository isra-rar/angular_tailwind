import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginRequest, LoginResponse } from '../../models/auth.model';
import { Observable } from 'rxjs';
import { ApiResponse } from '../../models/api-response.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl: string = 'http://localhost:8080/api/auth';


  constructor(private http: HttpClient) { }

  login(credentials: LoginRequest): Observable<ApiResponse<LoginResponse>> {
    return this.http.post<ApiResponse<LoginResponse>>(`${this.apiUrl}/login`, credentials);
  }

  exchangeCodeForToken(code: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/google`, { code });
  }
}
