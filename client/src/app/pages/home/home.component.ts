import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { RequireAuthorizationComponent } from '../../components/require-authorization/require-authorization.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RequireAuthorizationComponent],
  templateUrl: './home.component.html',
  styles: ``,
})
export class HomeComponent {
  constructor(private authService: AuthService) {}

  get isLoggedIn() {
    return !!this.authService.identityClaims;
  }
}
