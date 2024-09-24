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

  async getAnalitics() {
    console.log('click!');

    const res = await fetch(
      'https://youtube.googleapis.com/youtube/v3/channels?part=snippet%2CcontentDetails%2Cstatistics&forUsername=@santiagofederici4455&key=AIzaSyA73y0Kl5AzEOjq-jEPAY_8sRupFjL6l0w'
    );
    console.log(res);

    const data = await res.json();
    console.log(data);
  }
}
