import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ChannelListResponse } from '../models/channel';

@Injectable({
  providedIn: 'root',
})
export class HomeService {
  private readonly _http = inject(HttpClient);
  API_KEY = 'AIzaSyA73y0Kl5AzEOjq-jEPAY_8sRupFjL6l0w';

  getInfo(access_token: string): Observable<ChannelListResponse> {
    return this._http.get(
      `https://youtube.googleapis.com/youtube/v3/channels?part=snippet%2CcontentDetails%2Cstatistics&mine=true&key=${this.API_KEY}`,
      {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      }
    );
  }
}
