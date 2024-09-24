import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { RequireAuthorizationComponent } from '../../components/require-authorization/require-authorization.component';
import { Subscription } from 'rxjs';
import { HomeService } from '../../services/home.service';
import { ChannelListResponse } from '../../models/channel';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RequireAuthorizationComponent],
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit, OnDestroy {
  constructor(private authService: AuthService) {}
  private subscription: Subscription = new Subscription();
  homeService = inject(HomeService);
  youtubeId: string = '';

  get isLoggedIn() {
    return !!this.authService.identityClaims;
  }

  ngOnInit(): void {
    this.subscription = this.homeService
      .getInfo(this.authService.accessToken)
      .subscribe((response: ChannelListResponse) => {
        if (response.items) this.youtubeId = response.items[0].id;
      });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
