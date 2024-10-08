import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WelcomeComponent } from './containers/welcome/welcome/welcome.component';
import { FullSearchComponent } from './containers/full-search/full-search/full-search.component';
import { UploadHouseComponent } from './containers/upload-house/upload-house/upload-house.component';
import { DetailsHouseComponent } from './containers/details-house/details-house/details-house.component';
import { LoginComponent } from './containers/login/login/login.component';
import { RegisterComponent } from './containers/register/register/register.component';
import { ProfileComponent } from './containers/profile/profile/profile.component';
import { ListHouseOwnerComponent } from './containers/list-house-owner/list-house-owner/list-house-owner.component';
import { UpdateHouseComponent } from './containers/update-house/update-house/update-house.component';
import { OpinionListHouseComponent } from './containers/opinion-list-house/opinion-list-house/opinion-list-house.component';
import { RentHouseComponent } from './containers/rent-house/rent-house/rent-house.component';
import { ListHouseRentComponent } from './containers/list-house-rent/list-house-rent/list-house-rent.component';
import { StatisticsComponent } from './containers/statistics/statistics/statistics.component';


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
  },
  {
    path: 'profile',
    component: ProfileComponent,
    data: {
      breadcrumb: [
        { label: 'Inicio', routerLink: '/welcome' },
        { label: 'Tu Perfil', routerLink: '/profile' },
      ],
    },
  },
  {
    path: 'list-house-owner',
    component: ListHouseOwnerComponent,
    data: {
      breadcrumb: [
        { label: 'Inicio', routerLink: '/welcome' },
        { label: 'Tus casas', routerLink: '/list-house-owner' },
      ],
    },
  },
  {
    path: 'update-house/:id',
    component: UpdateHouseComponent,
    data: {
      breadcrumb: [
        { label: 'Inicio', routerLink: '/welcome' },
        { label: 'Tus casas', routerLink: '/list-house-owner' },
        { label: 'Modificación casa', routerLink: '/update-house/:id' }
      ],
    },
  },
  {
    path: 'opinion-list-house/:idCasa',
    component: OpinionListHouseComponent,
    data: {
      breadcrumb: [
        { label: 'Inicio', routerLink: '/welcome' },
        { label: 'Búsquedas', routerLink: '/full-search' },
        { label: 'Detalles Casa', routerLink: '/details-house/:idCasa' },
        { label: 'Opinion Casa', routerLink: '/opinion-list-house/:idCasa' }
      ],
    },
  },
  {
    path: 'rent-house/:idCasa',
    component: RentHouseComponent,
    data: {
      breadcrumb: [
        { label: 'Inicio', routerLink: '/welcome' },
        { label: 'Búsquedas', routerLink: '/full-search' },
        { label: 'Detalles Casa', routerLink: '/details-house/:idCasa' },
        { label: 'Alquila Casa', routerLink: '/rent-house/:idCasa' }
      ],
    },
  },
  {
    path: 'list-house-rent',
    component: ListHouseRentComponent,
    data: {
      breadcrumb: [
        { label: 'Inicio', routerLink: '/welcome' },
        { label: 'Ver tus reservas', routerLink: '/list-house-rent' }
      ],
    },
  },
  {
    path: 'statistics',
    component: StatisticsComponent,
    data: {
      breadcrumb: [
        { label: 'Inicio', routerLink: '/welcome' },
        { label: 'Estadísticas y datos', routerLink: '/statistics' }
      ],
    },
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
