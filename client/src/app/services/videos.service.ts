import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { VideoUploadResponse } from '../models/video';

@Injectable({
  providedIn: 'root',
})
export class VideosService {
  private readonly _http = inject(HttpClient);

  uploadVideo(formData: FormData): Observable<VideoUploadResponse> {
    return this._http.post('http://localhost:1234/upload-video', formData);
  }
}
