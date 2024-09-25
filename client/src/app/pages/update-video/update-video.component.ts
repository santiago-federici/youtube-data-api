import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { VideosService } from '../../services/videos.service';
import { Subscription } from 'rxjs';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-update-video',
  standalone: true,
  imports: [],
  templateUrl: './update-video.component.html',
})
export class UpdateVideoComponent implements OnInit, OnDestroy {
  videosSevice: VideosService = inject(VideosService);
  private subscription: Subscription = new Subscription();
  videoDetails: any;
  private route: ActivatedRoute = inject(ActivatedRoute);
  videoId: string = '';

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.videoId = params.get('videoId') || '';

      this.subscription = this.videosSevice
        .getVideoById(this.videoId, this.authService.accessToken)
        .subscribe((video: any) => {
          this.videoDetails = video.items[0];
          console.log(this.videoDetails);
        });
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
