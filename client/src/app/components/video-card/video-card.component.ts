import { Component, inject, Input } from '@angular/core';
import { Subscription } from 'rxjs';
import { VideosService } from '../../services/videos.service';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-video-card',
  standalone: true,
  imports: [],
  templateUrl: './video-card.component.html',
})
export class VideoCardComponent {
  copyMessage: string = '';
  deleteMessage: string = '';

  @Input() imageUrl: string = '';
  @Input() title: string = '';
  @Input() description: string = '';
  @Input() videoId: string = '';

  private subscription: Subscription = new Subscription();
  videosService: VideosService = inject(VideosService);

  constructor(private authService: AuthService, private router: Router) {}

  copyVideoId(videoId: string) {
    navigator.clipboard.writeText(videoId);
    this.copyMessage = 'Copied!';
    setTimeout(() => {
      this.copyMessage = '';
    }, 3000);
  }

  deleteVideo(videoId: string) {
    this.subscription = this.videosService
      .deleteVideo(videoId, this.authService.accessToken)
      .subscribe(() => {
        this.deleteMessage = 'Video deleted successfully';
        setTimeout(() => {
          this.deleteMessage = '';
          this.router
            .navigateByUrl('/', { skipLocationChange: true })
            .then(() => {
              this.router.navigate(['/my-videos']);
            });
        }, 3000);
      });
  }
}
