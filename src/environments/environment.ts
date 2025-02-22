export const environment = {
    production: false,
    googleAuth: {
      clientId: '196774121280-1hiicc2ulo073omhv7fddgsj2snp1404.apps.googleusercontent.com',
      redirectUri: 'http://localhost:8080/api/auth/google',
      responseType: 'code',
      scope: 'openid email profile',
      authUrl: 'https://accounts.google.com/o/oauth2/auth'
    },
    api: {
      auth: 'http://localhost:8080/api/auth',
      users: 'http://localhost:8080/api/users',
      clockPray: 'http://localhost:8080/clockPray'
    }
  };
  