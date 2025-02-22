import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthGoogleService {

  constructor() { }

  loginWithGoogle(): void {

    // Usando `window.location.assign` para navegar até a URL de autenticação
    window.location.assign(
      `${environment.googleAuth.authUrl}?client_id=${environment.googleAuth.clientId}&redirect_uri=${environment.googleAuth.redirectUri}&response_type=${environment.googleAuth.responseType}&scope=${environment.googleAuth.scope}`
    );
  }
}
