import { Routes } from '@angular/router';
import { HomePageComponent } from '@pages/home/home-page';

export const routes: Routes = [
  {
    path: '',
    component: HomePageComponent,
  },
  {
    path: '**',
    redirectTo: '',
  },
];
