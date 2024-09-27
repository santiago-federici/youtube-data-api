import {
  Component,
  inject,
  Input,
  OnChanges,
  OnDestroy,
  SimpleChanges,
} from '@angular/core';
import { Subscription } from 'rxjs';
import { VideosService } from '../../services/videos.service';
import { AuthService } from '../../services/auth.service';
import { Statistics, Video, VideosListResponse } from '../../models/video';

@Component({
  selector: 'app-statistics',
  standalone: true,
  imports: [],
  templateUrl: './statistics.component.html',
})
export class StatisticsComponent implements OnChanges, OnDestroy {
  @Input() isStatisticsOpen: boolean = false;
  @Input() videoId: string = '';
  @Input() toggleStatistics = () => {};
  statistics: Statistics | undefined = undefined;

  private subscription: Subscription = new Subscription();
  videosService: VideosService = inject(VideosService);

  constructor(private authService: AuthService) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['isStatisticsOpen'] && this.isStatisticsOpen) {
      if (this.videoId) {
        this.subscription = this.videosService
          .getVideoStatistics(this.videoId, this.authService.accessToken)
          .subscribe((data: VideosListResponse) => {
            const items = data.items as Video[];
            this.statistics = items[0].statistics;
          });
      }
    }
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
