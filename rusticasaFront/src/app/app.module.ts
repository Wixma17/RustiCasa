import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { HeaderModule } from './containers/header/header.module';
import { FooterModule } from './containers/footer/footer.module';
import { WelcomeModule } from './containers/welcome/welcome.module';
import { FullSearchModule } from './containers/full-search/full-search.module';
import { UploadHouseModule } from './containers/upload-house/upload-house.module';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule, HeaderModule, FooterModule,WelcomeModule,FullSearchModule,UploadHouseModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
