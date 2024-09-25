import { Component } from '@angular/core';
import { RequireAuthorizationComponent } from '../../components/require-authorization/require-authorization.component';
import { AuthService } from '../../services/auth.service';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-analitics',
  standalone: true,
  imports: [RequireAuthorizationComponent],
  templateUrl: './analitics.component.html',
  styles: ``,
})
export class AnaliticsComponent {
  private API_KEY = environment.API_KEY;

  constructor(private authService: AuthService) {}

  get isLoggedIn() {
    return !!this.authService.identityClaims;
  }

  async getAnalitics() {
    console.log('click!');

    const res = await fetch(
      `https://youtube.googleapis.com/youtube/v3/channels?part=snippet%2CcontentDetails%2Cstatistics&forUsername=@santiagofederici4455&key=${this.API_KEY}`
    );
    console.log(res);

    const data = await res.json();
    console.log(data);
  }
}
