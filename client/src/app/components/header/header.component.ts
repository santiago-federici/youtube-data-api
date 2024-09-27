import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { UserProfile } from '../../models/user';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [],
  templateUrl: './header.component.html',
})
export class HeaderComponent implements OnInit {
  isProfileMenuOpen = false;

  userProfile: UserProfile | undefined = undefined;
  constructor(private authService: AuthService) {}

  get isLoggedIn() {
    return !!this.authService.identityClaims;
  }

  logout() {
    this.authService.logout();
  }

  ngOnInit() {
    if (this.authService.identityClaims) {
      this.authService.userProfile.subscribe((profile: UserProfile) => {
        this.userProfile = profile;
      });
    }
  }
}
