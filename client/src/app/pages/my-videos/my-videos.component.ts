import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { RequireAuthorizationComponent } from '../../components/require-authorization/require-authorization.component';
import { AuthService } from '../../services/auth.service';
import { Subscription } from 'rxjs';
import { VideosService } from '../../services/videos.service';
import { VideosListResponse } from '../../models/video';

@Component({
  selector: 'app-my-videos',
  standalone: true,
  imports: [RequireAuthorizationComponent],
  templateUrl: './my-videos.component.html',
})
export class MyVideosComponent implements OnInit, OnDestroy {
  videos: VideosListResponse['items'] = [
    // {
    //   kind: 'youtube#searchResult',
    //   etag: 'FZViYSrnUq6xL0JBdyiIDb3mC5A',
    //   id: {
    //     kind: 'youtube#video',
    //     videoId: 'Gc9scr5cFLw',
    //   },
    //   snippet: {
    //     publishedAt: '2024-09-24T12:34:00Z',
    //     channelId: 'UCrJK9gzG1W3yb7Q66IQLEVA',
    //     title: 'testing again',
    //     description: 'plz',
    //     thumbnails: {
    //       default: {
    //         url: 'https://i.ytimg.com/vi/Gc9scr5cFLw/default.jpg',
    //         width: 120,
    //         height: 90,
    //       },
    //       medium: {
    //         url: 'https://i.ytimg.com/vi/Gc9scr5cFLw/mqdefault.jpg',
    //         width: 320,
    //         height: 180,
    //       },
    //       high: {
    //         url: 'https://i.ytimg.com/vi/Gc9scr5cFLw/hqdefault.jpg',
    //         width: 480,
    //         height: 360,
    //       },
    //       standard: {
    //         url: 'https://i.ytimg.com/vi/Gc9scr5cFLw/sddefault.jpg',
    //         width: 640,
    //         height: 480,
    //       },
    //     },
    //     channelTitle: 'Santiago Federici',
    //     liveBroadcastContent: 'none',
    //     publishTime: '2024-09-24T12:34:00Z',
    //   },
    // },
    // {
    //   kind: 'youtube#searchResult',
    //   etag: 'ByxcnebCrjAxScNGN0xjsxQjrmQ',
    //   id: {
    //     kind: 'youtube#video',
    //     videoId: '8baxKyQ_1lg',
    //   },
    //   snippet: {
    //     publishedAt: '2024-09-24T12:26:51Z',
    //     channelId: 'UCrJK9gzG1W3yb7Q66IQLEVA',
    //     title: 'test',
    //     description: 'test',
    //     thumbnails: {
    //       default: {
    //         url: 'https://i.ytimg.com/vi/8baxKyQ_1lg/default.jpg',
    //         width: 120,
    //         height: 90,
    //       },
    //       medium: {
    //         url: 'https://i.ytimg.com/vi/8baxKyQ_1lg/mqdefault.jpg',
    //         width: 320,
    //         height: 180,
    //       },
    //       high: {
    //         url: 'https://i.ytimg.com/vi/8baxKyQ_1lg/hqdefault.jpg',
    //         width: 480,
    //         height: 360,
    //       },
    //       standard: {
    //         url: 'https://i.ytimg.com/vi/8baxKyQ_1lg/sddefault.jpg',
    //         width: 640,
    //         height: 480,
    //       },
    //     },
    //     channelTitle: 'Santiago Federici',
    //     liveBroadcastContent: 'none',
    //     publishTime: '2024-09-24T12:26:51Z',
    //   },
    // },
    // {
    //   kind: 'youtube#searchResult',
    //   etag: 'WolIRU11aMB9Tuldp-f4pGmEnv4',
    //   id: {
    //     kind: 'youtube#video',
    //     videoId: '7fY5nhPnJ2w',
    //   },
    //   snippet: {
    //     publishedAt: '2024-09-24T12:26:50Z',
    //     channelId: 'UCrJK9gzG1W3yb7Q66IQLEVA',
    //     title: 'test',
    //     description: 'test',
    //     thumbnails: {
    //       default: {
    //         url: 'https://i9.ytimg.com/vi/7fY5nhPnJ2w/default.jpg?sqp=CIjfz7cG&rs=AOn4CLAfZxwweLag-XGwNkKI0iJfNq7BUw',
    //         width: 120,
    //         height: 90,
    //       },
    //       medium: {
    //         url: 'https://i9.ytimg.com/vi/7fY5nhPnJ2w/mqdefault.jpg?sqp=CIjfz7cG&rs=AOn4CLA18mayfdaX6YHqBUot70RZgWdtfQ',
    //         width: 320,
    //         height: 180,
    //       },
    //       high: {
    //         url: 'https://i9.ytimg.com/vi/7fY5nhPnJ2w/hqdefault.jpg?sqp=CIjfz7cG&rs=AOn4CLAvwmoUdq9DEs4pjmjcdph66x3INQ',
    //         width: 480,
    //         height: 360,
    //       },
    //       standard: {
    //         url: 'https://i9.ytimg.com/vi/7fY5nhPnJ2w/sddefault.jpg?sqp=CIjfz7cG&rs=AOn4CLDEoNLnwnLgU8pSNJkSECv34HQSjg',
    //         width: 640,
    //         height: 480,
    //       },
    //     },
    //     channelTitle: 'Santiago Federici',
    //     liveBroadcastContent: 'none',
    //     publishTime: '2024-09-24T12:26:50Z',
    //   },
    // },
    // {
    //   kind: 'youtube#searchResult',
    //   etag: 'lI1JhaPgd3VUkTOj-vqYEmHAQLs',
    //   id: {
    //     kind: 'youtube#video',
    //     videoId: '_e6-vswA3T8',
    //   },
    //   snippet: {
    //     publishedAt: '2024-09-24T11:57:20Z',
    //     channelId: 'UCrJK9gzG1W3yb7Q66IQLEVA',
    //     title: 'test',
    //     description: 'test',
    //     thumbnails: {
    //       default: {
    //         url: 'https://i9.ytimg.com/vi/_e6-vswA3T8/default.jpg?sqp=CIjfz7cG&rs=AOn4CLDSmbTyNe8UVKgy8q3qogeHR7x71Q',
    //         width: 120,
    //         height: 90,
    //       },
    //       medium: {
    //         url: 'https://i9.ytimg.com/vi/_e6-vswA3T8/mqdefault.jpg?sqp=CIjfz7cG&rs=AOn4CLC7fTdoV3L-44TbzQFzCgzCp6Mi8g',
    //         width: 320,
    //         height: 180,
    //       },
    //       high: {
    //         url: 'https://i9.ytimg.com/vi/_e6-vswA3T8/hqdefault.jpg?sqp=CIjfz7cG&rs=AOn4CLAz_06ZCp9vQXT4Drat3lIWTbUy4A',
    //         width: 480,
    //         height: 360,
    //       },
    //       standard: {
    //         url: 'https://i9.ytimg.com/vi/_e6-vswA3T8/sddefault.jpg?sqp=CIjfz7cG&rs=AOn4CLDHS9EJnz58whAde8B8UbbzEkcnwg',
    //         width: 640,
    //         height: 480,
    //       },
    //     },
    //     channelTitle: 'Santiago Federici',
    //     liveBroadcastContent: 'none',
    //     publishTime: '2024-09-24T11:57:20Z',
    //   },
    // },
    // {
    //   kind: 'youtube#searchResult',
    //   etag: 'x087KOIIuoQlWeUA0JAGqRsMap4',
    //   id: {
    //     kind: 'youtube#video',
    //     videoId: 'VmC9MEnRT2Q',
    //   },
    //   snippet: {
    //     publishedAt: '2024-09-23T12:31:54Z',
    //     channelId: 'UCrJK9gzG1W3yb7Q66IQLEVA',
    //     title: 'last test',
    //     description: 'please!',
    //     thumbnails: {
    //       default: {
    //         url: 'https://i9.ytimg.com/vi/VmC9MEnRT2Q/default.jpg?sqp=CIjfz7cG&rs=AOn4CLC6eazjy-HKRHDVEsr7aWffO8jgJg',
    //         width: 120,
    //         height: 90,
    //       },
    //       medium: {
    //         url: 'https://i9.ytimg.com/vi/VmC9MEnRT2Q/mqdefault.jpg?sqp=CIjfz7cG&rs=AOn4CLCYCkJLbXJpGbmpMhmRihDaLf6h9Q',
    //         width: 320,
    //         height: 180,
    //       },
    //       high: {
    //         url: 'https://i9.ytimg.com/vi/VmC9MEnRT2Q/hqdefault.jpg?sqp=CIjfz7cG&rs=AOn4CLB64Grf258iUuyGGiuNjiD2SkVHyA',
    //         width: 480,
    //         height: 360,
    //       },
    //       standard: {
    //         url: 'https://i9.ytimg.com/vi/VmC9MEnRT2Q/sddefault.jpg?sqp=CIjfz7cG&rs=AOn4CLDM8wjRJm2zTyf4GO_Q-w5-GFeifg',
    //         width: 640,
    //         height: 480,
    //       },
    //     },
    //     channelTitle: 'Santiago Federici',
    //     liveBroadcastContent: 'none',
    //     publishTime: '2024-09-23T12:31:54Z',
    //   },
    // },
    // {
    //   kind: 'youtube#searchResult',
    //   etag: 'Vfz8UXkrtvRJPZqi4Ur1YrDMEDM',
    //   id: {
    //     kind: 'youtube#video',
    //     videoId: 'oxx0nWk2pV4',
    //   },
    //   snippet: {
    //     publishedAt: '2024-09-23T12:07:04Z',
    //     channelId: 'UCrJK9gzG1W3yb7Q66IQLEVA',
    //     title: 'channel intro!',
    //     description: 'this in my new intro',
    //     thumbnails: {
    //       default: {
    //         url: 'https://i.ytimg.com/vi/oxx0nWk2pV4/default.jpg',
    //         width: 120,
    //         height: 90,
    //       },
    //       medium: {
    //         url: 'https://i.ytimg.com/vi/oxx0nWk2pV4/mqdefault.jpg',
    //         width: 320,
    //         height: 180,
    //       },
    //       high: {
    //         url: 'https://i.ytimg.com/vi/oxx0nWk2pV4/hqdefault.jpg',
    //         width: 480,
    //         height: 360,
    //       },
    //       standard: {
    //         url: 'https://i.ytimg.com/vi/oxx0nWk2pV4/sddefault.jpg',
    //         width: 640,
    //         height: 480,
    //       },
    //     },
    //     channelTitle: 'Santiago Federici',
    //     liveBroadcastContent: 'none',
    //     publishTime: '2024-09-23T12:07:04Z',
    //   },
    // },
    // {
    //   kind: 'youtube#searchResult',
    //   etag: '2WA4CBiwTf0FiSmI0yUd0ohRdck',
    //   id: {
    //     kind: 'youtube#video',
    //     videoId: 'XMN_ruMpIsE',
    //   },
    //   snippet: {
    //     publishedAt: '2024-09-23T11:27:36Z',
    //     channelId: 'UCrJK9gzG1W3yb7Q66IQLEVA',
    //     title: 'unknown',
    //     description: '',
    //     thumbnails: {
    //       default: {
    //         url: 'https://i9.ytimg.com/vi/XMN_ruMpIsE/default.jpg?sqp=CIjfz7cG&rs=AOn4CLClimtAORYhwXunpSbqb3l9GAIg4w',
    //         width: 120,
    //         height: 90,
    //       },
    //       medium: {
    //         url: 'https://i9.ytimg.com/vi/XMN_ruMpIsE/mqdefault.jpg?sqp=CIjfz7cG&rs=AOn4CLBh0JCKdhkAgLWaMa6zuaayUQiYgA',
    //         width: 320,
    //         height: 180,
    //       },
    //       high: {
    //         url: 'https://i9.ytimg.com/vi/XMN_ruMpIsE/hqdefault.jpg?sqp=CIjfz7cG&rs=AOn4CLAbQWna9N6JP7pi2u-tiWmONw5HwQ',
    //         width: 480,
    //         height: 360,
    //       },
    //       standard: {
    //         url: 'https://i9.ytimg.com/vi/XMN_ruMpIsE/sddefault.jpg?sqp=CIjfz7cG&rs=AOn4CLD7ukJFyLjN4kyVN9kdNhvz7ZKROQ',
    //         width: 640,
    //         height: 480,
    //       },
    //     },
    //     channelTitle: 'Santiago Federici',
    //     liveBroadcastContent: 'none',
    //     publishTime: '2024-09-23T11:27:36Z',
    //   },
    // },
    // {
    //   kind: 'youtube#searchResult',
    //   etag: '1gZknTvlGEy8ofQYG2q7-FQCvQ0',
    //   id: {
    //     kind: 'youtube#video',
    //     videoId: 'nd5UM8SdSXc',
    //   },
    //   snippet: {
    //     publishedAt: '2024-09-23T11:11:22Z',
    //     channelId: 'UCrJK9gzG1W3yb7Q66IQLEVA',
    //     title: 'unknown',
    //     description: '',
    //     thumbnails: {
    //       default: {
    //         url: 'https://i9.ytimg.com/vi/nd5UM8SdSXc/default.jpg?sqp=CIjfz7cG&rs=AOn4CLDnF1UtmgOD3YvZe5HnT1x4ceq5yA',
    //         width: 120,
    //         height: 90,
    //       },
    //       medium: {
    //         url: 'https://i9.ytimg.com/vi/nd5UM8SdSXc/mqdefault.jpg?sqp=CIjfz7cG&rs=AOn4CLCtyumpKsKJVLJQ10ExmIs9vFD_Ug',
    //         width: 320,
    //         height: 180,
    //       },
    //       high: {
    //         url: 'https://i9.ytimg.com/vi/nd5UM8SdSXc/hqdefault.jpg?sqp=CIjfz7cG&rs=AOn4CLDBMvc8Bf_zQpu6CvLu6VHZY3c4vw',
    //         width: 480,
    //         height: 360,
    //       },
    //       standard: {
    //         url: 'https://i9.ytimg.com/vi/nd5UM8SdSXc/sddefault.jpg?sqp=CIjfz7cG&rs=AOn4CLA46jfuhf_9pz1ZtP8FUUhbNeKwPg',
    //         width: 640,
    //         height: 480,
    //       },
    //     },
    //     channelTitle: 'Santiago Federici',
    //     liveBroadcastContent: 'none',
    //     publishTime: '2024-09-23T11:11:22Z',
    //   },
    // },
    // {
    //   kind: 'youtube#searchResult',
    //   etag: '_BK4VVIkhc-cQsxDYLYtJEsqLWY',
    //   id: {
    //     kind: 'youtube#video',
    //     videoId: 'PpAI-_dSlMU',
    //   },
    //   snippet: {
    //     publishedAt: '2024-09-23T11:09:30Z',
    //     channelId: 'UCrJK9gzG1W3yb7Q66IQLEVA',
    //     title: 'unknown',
    //     description: '',
    //     thumbnails: {
    //       default: {
    //         url: 'https://i9.ytimg.com/vi/PpAI-_dSlMU/default.jpg?sqp=CIjfz7cG&rs=AOn4CLDndKX4DDYGvVGnrkIGje53NcK63A',
    //         width: 120,
    //         height: 90,
    //       },
    //       medium: {
    //         url: 'https://i9.ytimg.com/vi/PpAI-_dSlMU/mqdefault.jpg?sqp=CIjfz7cG&rs=AOn4CLDpUsgyGea86gssZPUUYOHvX3I8pg',
    //         width: 320,
    //         height: 180,
    //       },
    //       high: {
    //         url: 'https://i9.ytimg.com/vi/PpAI-_dSlMU/hqdefault.jpg?sqp=CIjfz7cG&rs=AOn4CLBdrAG9KcFynunw-s0p8QEY7hGNvw',
    //         width: 480,
    //         height: 360,
    //       },
    //       standard: {
    //         url: 'https://i9.ytimg.com/vi/PpAI-_dSlMU/sddefault.jpg?sqp=CIjfz7cG&rs=AOn4CLD1RwkRgwp1a6o8uhU-dD3xgXAT3A',
    //         width: 640,
    //         height: 480,
    //       },
    //     },
    //     channelTitle: 'Santiago Federici',
    //     liveBroadcastContent: 'none',
    //     publishTime: '2024-09-23T11:09:30Z',
    //   },
    // },
    // {
    //   kind: 'youtube#searchResult',
    //   etag: 'ISy4sgj8QkZx0MZayh7TYQQUeWc',
    //   id: {
    //     kind: 'youtube#video',
    //     videoId: 'Rxbk7JZP-I0',
    //   },
    //   snippet: {
    //     publishedAt: '2024-09-23T11:03:46Z',
    //     channelId: 'UCrJK9gzG1W3yb7Q66IQLEVA',
    //     title: 'New video',
    //     description: 'with some description',
    //     thumbnails: {
    //       default: {
    //         url: 'https://i9.ytimg.com/vi/Rxbk7JZP-I0/default.jpg?sqp=CIjfz7cG&rs=AOn4CLAgrhHBVuyR3u74-UcJ2F155UqA2A',
    //         width: 120,
    //         height: 90,
    //       },
    //       medium: {
    //         url: 'https://i9.ytimg.com/vi/Rxbk7JZP-I0/mqdefault.jpg?sqp=CIjfz7cG&rs=AOn4CLAYhSlIVBmxIJNBZuYyVYXe0X_Uiw',
    //         width: 320,
    //         height: 180,
    //       },
    //       high: {
    //         url: 'https://i9.ytimg.com/vi/Rxbk7JZP-I0/hqdefault.jpg?sqp=CIjfz7cG&rs=AOn4CLC00c6zGJH3ctZw3xGjiqJgHI5AMQ',
    //         width: 480,
    //         height: 360,
    //       },
    //       standard: {
    //         url: 'https://i9.ytimg.com/vi/Rxbk7JZP-I0/sddefault.jpg?sqp=CIjfz7cG&rs=AOn4CLBjkzC8axFjXxSosmbGs09-2H3MJg',
    //         width: 640,
    //         height: 480,
    //       },
    //     },
    //     channelTitle: 'Santiago Federici',
    //     liveBroadcastContent: 'none',
    //     publishTime: '2024-09-23T11:03:46Z',
    //   },
    // },
    // {
    //   kind: 'youtube#searchResult',
    //   etag: 'xMMs2TMWY_9sRT_w1ElUUftQsXA',
    //   id: {
    //     kind: 'youtube#video',
    //     videoId: '5DZvJgol5cs',
    //   },
    //   snippet: {
    //     publishedAt: '2024-09-20T11:04:05Z',
    //     channelId: 'UCrJK9gzG1W3yb7Q66IQLEVA',
    //     title: 'New video',
    //     description: 'with some description',
    //     thumbnails: {
    //       default: {
    //         url: 'https://i.ytimg.com/vi/5DZvJgol5cs/default.jpg',
    //         width: 120,
    //         height: 90,
    //       },
    //       medium: {
    //         url: 'https://i.ytimg.com/vi/5DZvJgol5cs/mqdefault.jpg',
    //         width: 320,
    //         height: 180,
    //       },
    //       high: {
    //         url: 'https://i.ytimg.com/vi/5DZvJgol5cs/hqdefault.jpg',
    //         width: 480,
    //         height: 360,
    //       },
    //       standard: {
    //         url: 'https://i.ytimg.com/vi/5DZvJgol5cs/sddefault.jpg',
    //         width: 640,
    //         height: 480,
    //       },
    //     },
    //     channelTitle: 'Santiago Federici',
    //     liveBroadcastContent: 'none',
    //     publishTime: '2024-09-20T11:04:05Z',
    //   },
    // },
    // {
    //   kind: 'youtube#searchResult',
    //   etag: 'WciekqBRYOld0MQtH1zedR_NOdU',
    //   id: {
    //     kind: 'youtube#video',
    //     videoId: '5cR7xZsnch8',
    //   },
    //   snippet: {
    //     publishedAt: '2024-09-19T14:55:01Z',
    //     channelId: 'UCrJK9gzG1W3yb7Q66IQLEVA',
    //     title: 'testing title',
    //     description: 'testing description',
    //     thumbnails: {
    //       default: {
    //         url: 'https://i9.ytimg.com/vi/5cR7xZsnch8/default.jpg?sqp=CIjfz7cG&rs=AOn4CLB7PdNTm8VOPWVuDiffpj90BlyGJQ',
    //         width: 120,
    //         height: 90,
    //       },
    //       medium: {
    //         url: 'https://i9.ytimg.com/vi/5cR7xZsnch8/mqdefault.jpg?sqp=CIjfz7cG&rs=AOn4CLBmoS8Uaq0ERkDD9b6x3AP63GDBdA',
    //         width: 320,
    //         height: 180,
    //       },
    //       high: {
    //         url: 'https://i9.ytimg.com/vi/5cR7xZsnch8/hqdefault.jpg?sqp=CIjfz7cG&rs=AOn4CLCFvSR_N6Y79Hj-0DTM6GlVNvGz8w',
    //         width: 480,
    //         height: 360,
    //       },
    //       standard: {
    //         url: 'https://i9.ytimg.com/vi/5cR7xZsnch8/sddefault.jpg?sqp=CIjfz7cG&rs=AOn4CLA9WuRovi8W78cjAR9yeQ8mSPCHqA',
    //         width: 640,
    //         height: 480,
    //       },
    //     },
    //     channelTitle: 'Santiago Federici',
    //     liveBroadcastContent: 'none',
    //     publishTime: '2024-09-19T14:55:01Z',
    //   },
    // },
  ];
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
        const items = data.items;
        console.log(items);
        this.videos = items;
      });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
