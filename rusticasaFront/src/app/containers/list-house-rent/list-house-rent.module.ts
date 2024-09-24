import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListHouseRentComponent } from './list-house-rent/list-house-rent.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { InputTextModule } from 'primeng/inputtext';
import { CheckboxModule } from 'primeng/checkbox';
import { CommonComponentsModule } from 'src/app/common-components/common-components.module';
import { SliderModule } from 'primeng/slider';
import { PaginatorModule } from 'primeng/paginator';
import { BrowserAnimationsModule, NoopAnimationsModule } from '@angular/platform-browser/animations';



@NgModule({
  declarations: [ListHouseRentComponent],
  imports: [
    CommonModule,
    FormsModule,
    ButtonModule,
    RippleModule,
    InputTextModule,
    CheckboxModule,
    CommonComponentsModule,
    ReactiveFormsModule,
    SliderModule,
    PaginatorModule,
    NoopAnimationsModule,
    BrowserAnimationsModule
  ]
})
export class ListHouseRentModule { }
