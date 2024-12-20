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
import {ListboxModule} from 'primeng/listbox';
import {CardModule} from 'primeng/card';
import {InputTextareaModule} from 'primeng/inputtextarea';
import {ToastModule} from 'primeng/toast';
import { MessagesModule } from 'primeng/messages';
import { MessageService } from 'primeng/api';


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
    TranslateModule,
    ListboxModule,
    CardModule,
    InputTextareaModule,
    ToastModule,
    MessagesModule
  ],
  providers: [CasaService,MessageService],
})
export class WelcomeModule {}
