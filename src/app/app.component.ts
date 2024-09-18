import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { LoginComponent } from './components/login/login.component';

import { HttpClientModule } from '@angular/common/http';
import { OAuthModule } from 'angular-oauth2-oidc';

@Component({
  selector: 'app-root',
  standalone: true,
  // imports: [RouterOutlet, LoginComponent, HttpClientModule, OAuthModule.forRoot()],
  imports: [RouterOutlet, LoginComponent, HttpClientModule, OAuthModule],
  templateUrl: './app.component.html',
})
export class AppComponent {
  title = 'youtube-data-api';
}
