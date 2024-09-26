import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { VideosService } from '../../services/videos.service';
import { Subscription } from 'rxjs';
import { AuthService } from '../../services/auth.service';
import {
  FormBuilder,
  type FormGroup,
  ReactiveFormsModule,
} from '@angular/forms';
import { UpdateVideo, VideosListResponse } from '../../models/video';
import { RequireAuthorizationComponent } from '../../components/require-authorization/require-authorization.component';

@Component({
  selector: 'app-update-video',
  standalone: true,
  imports: [RequireAuthorizationComponent, ReactiveFormsModule],
  templateUrl: './update-video.component.html',
})
export class UpdateVideoComponent implements OnInit, OnDestroy {
  videosSevice: VideosService = inject(VideosService);
  private subscription: Subscription = new Subscription();
  videoDetails: UpdateVideo | null = null;
  private route: ActivatedRoute = inject(ActivatedRoute);
  videoId: string = '';
  tags: string[] = [];
  successMessage: string = '';

  updateVideoForm: FormGroup;

  constructor(
    private authService: AuthService,
    private formbuilder: FormBuilder,
    private router: Router
  ) {
    this.updateVideoForm = this.formbuilder.group({
      title: [''],
      description: [''],
      tags: [[]],
      categoryId: [''],
    });
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.videoId = params.get('videoId') || '';

      this.subscription = this.videosSevice
        .getVideoById(this.videoId, this.authService.accessToken)
        .subscribe((video: VideosListResponse) => {
          if (video.items) {
            this.videoDetails = video.items[0] as UpdateVideo;
          }

          this.updateVideoForm.patchValue({
            title: this.videoDetails?.snippet.title,
            description: this.videoDetails?.snippet.description,
            tags: this.videoDetails?.snippet.tags,
            categoryId: this.videoDetails?.snippet.categoryId,
          });

          this.tags = this.updateVideoForm.get('tags')?.value;
        });
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
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
    this.updateVideoForm.get('tags')?.setValue(this.tags);
  }

  onSubmit(): void {
    if (this.updateVideoForm.valid) {
      const body = {
        id: this.videoDetails?.id as string,
        snippet: {
          title: this.updateVideoForm.value.title,
          description: this.updateVideoForm.value.description,
          tags: this.updateVideoForm.value.tags,
          categoryId: this.updateVideoForm.value.categoryId,
        },
      };

      this.subscription = this.videosSevice
        .updateVideo(body, this.authService.accessToken)
        .subscribe((updatedForm) => {
          console.log('response from component.ts: ', updatedForm);
          this.successMessage = 'Update successful';
          setTimeout(() => {
            this.successMessage = '';
            this.router.navigate(['/my-videos']);
          }, 3000);
        });
    }
  }
}
