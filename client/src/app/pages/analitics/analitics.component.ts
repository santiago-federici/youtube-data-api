import { Component } from '@angular/core';
import { RequireAuthorizationComponent } from '../../components/require-authorization/require-authorization.component';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-analitics',
  standalone: true,
  imports: [RequireAuthorizationComponent],
  templateUrl: './analitics.component.html',
  styles: ``,
})
export class AnaliticsComponent {
  constructor(private authService: AuthService) {}

  get isLoggedIn() {
    return !!this.authService.identityClaims;
  }
}
