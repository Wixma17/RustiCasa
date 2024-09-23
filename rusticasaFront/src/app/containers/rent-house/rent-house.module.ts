import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RentHouseComponent } from './rent-house/rent-house.component';
import { CalendarModule } from 'primeng/calendar';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {KeyFilterModule} from 'primeng/keyfilter';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { InputTextModule } from 'primeng/inputtext';




@NgModule({
  declarations: [RentHouseComponent],
  imports: [
    CommonModule,
    CalendarModule,
    FormsModule,
    ReactiveFormsModule,
    KeyFilterModule,
    BrowserAnimationsModule,
    InputTextModule
  ]
})
export class RentHouseModule { }
