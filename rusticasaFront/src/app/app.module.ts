import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { HeaderModule } from './containers/header/header.module';
import { FooterModule } from './containers/footer/footer.module';
import { WelcomeModule } from './containers/welcome/welcome.module';
import { FullSearchModule } from './containers/full-search/full-search.module';
import { UploadHouseModule } from './containers/upload-house/upload-house.module';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { DetailsHouseModule } from './containers/details-house/details-house.module';
import { RegisterModule } from './containers/register/register.module';
import { LoginModule } from './containers/login/login.module';
import {ToggleButtonModule} from 'primeng/togglebutton';
import { MessageService } from 'primeng/api';
import { ProfileModule } from './containers/profile/profile.module';
import { ListHouseOwnerModule } from './containers/list-house-owner/list-house-owner.module';
import { UpdateHouseModule } from './containers/update-house/update-house.module';


export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}


@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    DetailsHouseModule,
    HeaderModule,
    FooterModule,
    WelcomeModule,
    FullSearchModule,
    UploadHouseModule,
    BreadcrumbModule,
    RegisterModule,
    LoginModule,
    ToggleButtonModule,
    ProfileModule,
    UpdateHouseModule,
    ListHouseOwnerModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient],
      },
      defaultLanguage: 'es'
    })
  ],
  providers: [MessageService],
  bootstrap: [AppComponent],
})
export class AppModule {}
