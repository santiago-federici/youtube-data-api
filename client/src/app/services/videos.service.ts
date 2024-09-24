import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { VideoUploadResponse } from '../models/video';

@Injectable({
  providedIn: 'root',
})
export class VideosService {
  API_KEY = 'AIzaSyA73y0Kl5AzEOjq-jEPAY_8sRupFjL6l0w';
  private readonly _http = inject(HttpClient);

  uploadVideo(formData: FormData): Observable<VideoUploadResponse> {
    return this._http.post('http://localhost:1234/upload-video', formData);
  }

  getMyVideos(accessToken: string) {
    return this._http.get(
      `https://youtube.googleapis.com/youtube/v3/search?part=snippet&forMine=true&maxResults=25&type=video&key=${this.API_KEY}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
  }
}
