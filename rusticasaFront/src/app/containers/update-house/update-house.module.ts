import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UpdateHouseComponent } from './update-house/update-house.component';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { CheckboxModule } from 'primeng/checkbox';
import { CalendarModule } from 'primeng/calendar';
import { FileUploadModule } from 'primeng/fileupload';
import { StepsModule } from 'primeng/steps';
import { DropdownModule } from 'primeng/dropdown';
import { BrowserAnimationsModule, NoopAnimationsModule } from '@angular/platform-browser/animations';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { InputNumberModule } from 'primeng/inputnumber';



@NgModule({
  declarations: [UpdateHouseComponent],
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
    InputNumberModule,
  ]
})
export class UpdateHouseModule { }
