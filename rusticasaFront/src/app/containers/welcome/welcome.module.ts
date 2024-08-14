import { CalendarModule } from 'primeng/calendar';
import { DropdownModule } from 'primeng/dropdown';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WelcomeComponent } from './welcome/welcome.component';
import { CasaService } from 'src/app/shared/services/casa.service';
import { CommonComponentsModule } from 'src/app/common-components/common-components.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CarouselModule } from 'primeng/carousel';
import {InputNumberModule} from 'primeng/inputnumber';
import { TranslateModule } from '@ngx-translate/core';


@NgModule({
  declarations: [WelcomeComponent],
  imports: [
    CommonModule,
    CarouselModule,
    CommonComponentsModule,
    DropdownModule,
    BrowserAnimationsModule,
    NoopAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    CalendarModule,
    InputNumberModule,
    TranslateModule
  ],
  providers: [CasaService],
})
export class WelcomeModule {}
