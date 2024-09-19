import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { LoginComponent } from './components/login/login.component';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, LoginComponent],
  templateUrl: './app.component.html',
})
export class AppComponent {
  title = 'youtube-data-api';

  userProfile: any;
  constructor(private authService: AuthService) {}

  ngOnInit() {
    if (this.authService.identityClaims) {
      this.authService.userProfile.subscribe((profile) => {
        this.userProfile = profile;
      });
    }
  }

  login() {
    this.authService.login();
  }

  logout() {
    this.authService.logout();
  }

  get isLoggedIn() {
    return !!this.authService.identityClaims;
  }
}
