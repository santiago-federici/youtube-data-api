import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [],
  templateUrl: './header.component.html',
})
export class HeaderComponent {
  isProfileMenuOpen = false;

  userProfile: any;
  constructor(private authService: AuthService) {}

  ngOnInit() {
    if (this.authService.identityClaims) {
      this.authService.userProfile.subscribe((profile) => {
        this.userProfile = profile;
      });
    }
  }

  logout() {
    this.authService.logout();
  }

  get isLoggedIn() {
    return !!this.authService.identityClaims;
  }
}
