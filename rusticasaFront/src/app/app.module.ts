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
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient],
      },
      defaultLanguage: 'es'
    })
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
