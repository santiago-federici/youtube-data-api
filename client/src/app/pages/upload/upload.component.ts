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
  tags: string[] = [];
  selectedFile: File | null = null;
  constructor(private authService: AuthService) {}

  addTag(event: any) {
    const input = event.target.value.trim();
    if (input) {
      this.tags.push(input); // Add the tag
      event.target.value = ''; // Clear the input
    }
    event.preventDefault(); // Prevent form submission on Enter key
  }

  removeTag(tag: string) {
    this.tags = this.tags.filter((t) => t !== tag); // Remove tag from the array
  }

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
