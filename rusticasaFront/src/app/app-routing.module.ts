import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WelcomeComponent } from './containers/welcome/welcome/welcome.component';
import { FullSearchComponent } from './containers/full-search/full-search/full-search.component';
import { UploadHouseComponent } from './containers/upload-house/upload-house/upload-house.component';
import { DetailsHouseComponent } from './containers/details-house/details-house/details-house.component';
import { LoginComponent } from './containers/login/login/login.component';
import { RegisterComponent } from './containers/register/register/register.component';

const routes: Routes = [
  { path: '', redirectTo: '/welcome', pathMatch: 'full' },
  {
    path: 'welcome',
    component: WelcomeComponent,
    data: { breadcrumb: [{ label: 'Inicio', routerLink: '/welcome' }] },
  },
  {
    path: 'full-search',
    component: FullSearchComponent,
    data: {
      breadcrumb: [
        { label: 'Inicio', routerLink: '/welcome' },
        { label: 'Búsquedas', routerLink: '/full-search' },
      ],
    },
  },
  {
    path: 'upload-house',
    component: UploadHouseComponent,
    data: {
      breadcrumb: [
        { label: 'Inicio', routerLink: '/welcome' },
        { label: 'Subir tu Casa', routerLink: '/upload-house' },
      ]
    },
  },
  {
    path: 'details-house/:idCasa',
    component: DetailsHouseComponent,
    data: {
      breadcrumb: [
        { label: 'Inicio', routerLink: '/welcome' },
        { label: 'Búsquedas', routerLink: '/full-search' },
        { label: 'Detalles Casa', routerLink: '/details-house/:idCasa' }
      ],
    },
  },
  {
    path: 'register',
    component: RegisterComponent,
    data: {
      breadcrumb: [
        { label: 'Inicio', routerLink: '/welcome' },
        { label: 'Resgistro', routerLink: '/register' },
      ],
    },
  },
  {
    path: 'login',
    component: LoginComponent,
    data: {
      breadcrumb: [
        { label: 'Inicio', routerLink: '/welcome' },
        { label: 'Inicio Sesión', routerLink: '/login' },
      ],
    },
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
