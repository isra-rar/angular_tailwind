import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthGoogleServicesService {

  private googleAuthUrl: string = 'https://accounts.google.com/o/oauth2/auth';

  constructor() { }

  loginWithGoogle(): void {
    const clientId = '196774121280-1hiicc2ulo073omhv7fddgsj2snp1404.apps.googleusercontent.com';
    const redirectUri = 'http://localhost:4200/auth/callback';
    const responseType = 'code';
    const scope = 'openid email profile';

    // Usando `window.location.assign` para navegar até a URL de autenticação
    window.location.assign(
      `${this.googleAuthUrl}?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=${responseType}&scope=${scope}`
    );
  }
}
