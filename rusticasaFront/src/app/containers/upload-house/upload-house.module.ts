import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UploadHouseComponent } from './upload-house/upload-house.component';
import { FileUploadModule } from 'primeng/fileupload';
import { CalendarModule } from 'primeng/calendar';
import { CheckboxModule } from 'primeng/checkbox';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RippleModule } from 'primeng/ripple';
import { ButtonModule } from 'primeng/button';
import { RouterModule } from '@angular/router';
import { InputTextModule } from 'primeng/inputtext';
import {StepsModule} from 'primeng/steps';
import { DropdownModule } from 'primeng/dropdown';
import { BrowserAnimationsModule, NoopAnimationsModule } from '@angular/platform-browser/animations';
import {InputTextareaModule} from 'primeng/inputtextarea';



@NgModule({
  declarations: [UploadHouseComponent],
  imports: [
    CommonModule,
    InputTextModule,
    FormsModule,
    RouterModule,
    ButtonModule,
    RippleModule,
    ReactiveFormsModule,
    CheckboxModule,
    CalendarModule,
    FileUploadModule,
    StepsModule,
    DropdownModule,
    BrowserAnimationsModule,
    NoopAnimationsModule,
    InputTextareaModule,
  ]
})
export class UploadHouseModule { }
