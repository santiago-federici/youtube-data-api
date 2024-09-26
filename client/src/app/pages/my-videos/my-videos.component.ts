import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { RequireAuthorizationComponent } from '../../components/require-authorization/require-authorization.component';
import { AuthService } from '../../services/auth.service';
import { Subscription } from 'rxjs';
import { VideosService } from '../../services/videos.service';
import { Video, VideosListResponse } from '../../models/video';

@Component({
  selector: 'app-my-videos',
  standalone: true,
  imports: [RequireAuthorizationComponent],
  templateUrl: './my-videos.component.html',
})
export class MyVideosComponent implements OnInit, OnDestroy {
  videos: Video[] = [];
  copyMessage: string = '';
  private subscription: Subscription = new Subscription();
  videosService: VideosService = inject(VideosService);

  constructor(private authService: AuthService) {}

  get isLoggedIn() {
    return !!this.authService.identityClaims;
  }

  copyVideoId(videoId: string) {
    navigator.clipboard.writeText(videoId);
    this.copyMessage = 'Copied!';
    setTimeout(() => {
      this.copyMessage = '';
    }, 3000);
  }

  ngOnInit(): void {
    this.subscription = this.videosService
      .getMyVideos(this.authService.accessToken)
      .subscribe((data: VideosListResponse) => {
        const items = data.items as Video[];
        this.videos = items;
      });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
