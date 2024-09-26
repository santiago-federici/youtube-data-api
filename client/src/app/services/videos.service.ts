import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UpdateVideo, VideoUploadResponse } from '../models/video';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class VideosService {
  private API_KEY = environment.API_KEY;
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

  getVideoById(videoId: string, accessToken: string) {
    return this._http.get(
      `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&id=${videoId}&key=${this.API_KEY}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
  }

  updateVideo(
    body: UpdateVideo,
    accessToken: string
  ): Observable<VideoUploadResponse> {
    return this._http.put(
      `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2Cstatus%2Clocalizations&key=${this.API_KEY}`,
      body,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
  }
}
