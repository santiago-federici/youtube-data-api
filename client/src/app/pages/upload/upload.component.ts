import { Component, inject, type OnDestroy } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { RequireAuthorizationComponent } from '../../components/require-authorization/require-authorization.component';
import { Subscription } from 'rxjs';
import { VideosService } from '../../services/videos.service';
import { VideoUploadResponse } from '../../models/video';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-upload',
  standalone: true,
  imports: [RequireAuthorizationComponent, ReactiveFormsModule],
  templateUrl: './upload.component.html',
})
export class UploadComponent implements OnDestroy {
  tags: string[] = [];
  uploadVideoForm: FormGroup;

  private readonly videosService = inject(VideosService);
  private subscription: Subscription = new Subscription();

  successMessage: string = '';
  errorMessage: string = '';

  constructor(
    private authService: AuthService,
    private formbuilder: FormBuilder,
    private router: Router
  ) {
    this.uploadVideoForm = this.formbuilder.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      categoryId: ['', Validators.required],
      tags: [[], Validators.required],
      file: [File, Validators.required],
    });
  }

  get isLoggedIn() {
    return !!this.authService.identityClaims;
  }

  addTag(event: Event) {
    event.preventDefault();

    const keyboardEvent = event as KeyboardEvent;
    const inputElement = keyboardEvent.target as HTMLInputElement;
    const input = inputElement.value.trim();
    if (input) {
      this.tags.push(input);
      this.uploadVideoForm.patchValue({
        tags: this.tags,
      });
      inputElement.value = '';
    }
  }

  removeTag(tag: string) {
    this.tags = this.tags.filter((t) => t !== tag);
    this.uploadVideoForm.patchValue({
      tags: this.tags,
    });
  }

  handleFileInput(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    if (inputElement.files) {
      this.uploadVideoForm.patchValue({
        file: inputElement.files[0],
      });
    }
  }

  onSubmit() {
    if (this.uploadVideoForm.valid) {
      const body = {
        title: this.uploadVideoForm.value.title,
        description: this.uploadVideoForm.value.description,
        categoryId: this.uploadVideoForm.value.categoryId,
        tags: this.uploadVideoForm.value.tags,
        file: this.uploadVideoForm.value.file,
      };

      this.subscription = this.videosService
        .uploadVideo(body, this.authService.accessToken)
        .subscribe((response: VideoUploadResponse) => {
          if (response.message) {
            this.successMessage = response.message;
            setTimeout(() => {
              this.successMessage = '';
              this.router.navigate(['/']);
            }, 3000);
          }

          if (response.errorMessage) {
            this.errorMessage = response.errorMessage;
            setTimeout(() => {
              this.errorMessage = '';
            }, 3000);
          }
        });
    }
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
