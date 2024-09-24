import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { RequireAuthorizationComponent } from '../../components/require-authorization/require-authorization.component';
import { AuthService } from '../../services/auth.service';
import { Subscription } from 'rxjs';
import { VideosService } from '../../services/videos.service';
import { ChannelListResponse } from '../../models/channel';

@Component({
  selector: 'app-my-videos',
  standalone: true,
  imports: [RequireAuthorizationComponent],
  templateUrl: './my-videos.component.html',
})
export class MyVideosComponent implements OnInit, OnDestroy {
  API_KEY = 'AIzaSyA73y0Kl5AzEOjq-jEPAY_8sRupFjL6l0w';

  videos: ChannelListResponse['items'] = [];
  private subscription: Subscription = new Subscription();
  videosService: VideosService = inject(VideosService);

  constructor(private authService: AuthService) {}

  get isLoggedIn() {
    return !!this.authService.identityClaims;
  }

  ngOnInit(): void {
    this.subscription = this.videosService
      .getMyVideos(this.authService.accessToken)
      .subscribe((data: ChannelListResponse) => {
        const items = data.items;
        this.videos = items;
      });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
