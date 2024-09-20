import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { RequireAuthorizationComponent } from '../../components/require-authorization/require-authorization.component';

@Component({
  selector: 'app-upload',
  standalone: true,
  imports: [RequireAuthorizationComponent],
  templateUrl: './upload.component.html',
})
export class UploadComponent {
  selectedFile: File | null = null;
  constructor(private authService: AuthService) {}

  get isLoggedIn() {
    return !!this.authService.identityClaims;
  }

  handleFileInput(event: any) {
    this.selectedFile = event.target.files[0];
  }

  async uploadVideo(event: Event) {
    event.preventDefault();

    if (!this.selectedFile) {
      console.error('No video file selected');
      return;
    }

    const formData = new FormData();
    formData.append('video', this.selectedFile);
    formData.append('access_token', this.authService.accessToken);

    const res = await fetch('http://localhost:1234/upload-video', {
      method: 'POST',
      body: formData,
    });

    const data = await res.json();
    console.log(data);
  }
}
