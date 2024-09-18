import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [],
  templateUrl: './login.component.html',
})
export class LoginComponent {
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
