import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { LoginComponent } from './components/login/login.component';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, LoginComponent],
  templateUrl: './app.component.html',
})
export class AppComponent {
  title = 'youtube-data-api';
  selectedFile: File | null = null;

  userProfile: any;
  constructor(private authService: AuthService) {}

  ngOnInit() {
    if (this.authService.identityClaims) {
      this.authService.userProfile.subscribe((profile) => {
        this.userProfile = profile;
      });
    }
  }

  login() {
    this.authService.login();
  }

  logout() {
    this.authService.logout();
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
