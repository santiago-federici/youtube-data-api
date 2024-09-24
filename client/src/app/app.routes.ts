import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { UploadComponent } from './pages/upload/upload.component';
import { AnaliticsComponent } from './pages/analitics/analitics.component';
import { MyVideosComponent } from './pages/my-videos/my-videos.component';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'upload',
    component: UploadComponent,
  },
  {
    path: 'my-videos',
    component: MyVideosComponent,
  },
  {
    path: 'analitics',
    component: AnaliticsComponent,
  },
];
