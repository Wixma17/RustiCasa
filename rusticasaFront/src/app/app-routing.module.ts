import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WelcomeComponent } from './containers/welcome/welcome/welcome.component';
import { FullSearchComponent } from './containers/full-search/full-search/full-search.component';
import { UploadHouseComponent } from './containers/upload-house/upload-house/upload-house.component';

const routes: Routes = [
  { path: '', redirectTo: '/welcome', pathMatch: 'full' },
  { path: 'welcome', component: WelcomeComponent },
  { path: 'full-search', component: FullSearchComponent },
  { path: 'upload-house', component: UploadHouseComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
