import { AuthConfig } from 'angular-oauth2-oidc';

export const authConfig: AuthConfig = {
  issuer: 'https://accounts.google.com',
  redirectUri: window.location.origin,
  clientId:
    '509801858419-7ia6okfvkaaq5nfvv9a6hbrio5p3fbpr.apps.googleusercontent.com',
  strictDiscoveryDocumentValidation: false,
  scope: 'openid profile email',
  // scope: 'openid profile email https://www.googleapis.com/auth/youtube.upload',
};
