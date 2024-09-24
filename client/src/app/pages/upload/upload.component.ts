import { Component, inject, type OnDestroy } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { RequireAuthorizationComponent } from '../../components/require-authorization/require-authorization.component';
import { Subscription } from 'rxjs';
import { VideosService } from '../../services/videos.service';
import { VideoUploadResponse } from '../../models/video';

@Component({
  selector: 'app-upload',
  standalone: true,
  imports: [RequireAuthorizationComponent],
  templateUrl: './upload.component.html',
})
export class UploadComponent implements OnDestroy {
  videoTitle: string = '';
  videoDescription: string = '';
  videoCategoryId: string = '';
  tags: string[] = [];
  selectedFile: File | null = null;

  private readonly videosService = inject(VideosService);
  private subscription: Subscription = new Subscription();

  successMessage: string = '';
  errorMessage: string = '';

  constructor(private authService: AuthService) {}

  get isLoggedIn() {
    return !!this.authService.identityClaims;
  }

  handleTitleInput(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    this.videoTitle = inputElement.value;
  }

  handleDescriptionInput(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    this.videoDescription = inputElement.value;
  }
  handleCategoryIdInput(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    this.videoCategoryId = inputElement.value;
  }

  addTag(event: Event) {
    event.preventDefault();

    const keyboardEvent = event as KeyboardEvent;
    const inputElement = keyboardEvent.target as HTMLInputElement;
    const input = inputElement.value.trim();
    if (input) {
      this.tags.push(input);
      inputElement.value = '';
    }
  }

  removeTag(tag: string) {
    this.tags = this.tags.filter((t) => t !== tag);
  }

  handleFileInput(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    if (inputElement.files) {
      this.selectedFile = inputElement.files[0];
    }
  }

  async handleFormSubmit(event: Event) {
    event.preventDefault();

    if (!this.selectedFile) {
      console.error('No video file selected');
      return;
    }

    const formData = new FormData();
    formData.append('title', this.videoTitle);
    formData.append('description', this.videoDescription);
    formData.append('categoryId', this.videoCategoryId);
    formData.append('tags', this.tags.join(','));
    formData.append('file', this.selectedFile);
    formData.append('access_token', this.authService.accessToken);

    this.subscription = this.videosService
      .uploadVideo(formData)
      .subscribe((response: VideoUploadResponse) => {
        if (response.message) this.successMessage = response.message;
        if (response.errorMessage) this.errorMessage = response.errorMessage;
      });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
