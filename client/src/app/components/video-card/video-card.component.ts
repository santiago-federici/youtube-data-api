import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-video-card',
  standalone: true,
  imports: [],
  templateUrl: './video-card.component.html',
})
export class VideoCardComponent {
  copyMessage: string = '';

  @Input() imageUrl: string = '';
  @Input() title: string = '';
  @Input() description: string = '';
  @Input() videoId: string = '';

  copyVideoId(videoId: string) {
    navigator.clipboard.writeText(videoId);
    this.copyMessage = 'Copied!';
    setTimeout(() => {
      this.copyMessage = '';
    }, 3000);
  }
}
