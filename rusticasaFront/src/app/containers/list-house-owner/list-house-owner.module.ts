import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListHouseOwnerComponent } from './list-house-owner/list-house-owner.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { InputTextModule } from 'primeng/inputtext';
import { CheckboxModule } from 'primeng/checkbox';
import { CommonComponentsModule } from 'src/app/common-components/common-components.module';
import { SliderModule } from 'primeng/slider';
import { PaginatorModule } from 'primeng/paginator';
import { BrowserAnimationsModule, NoopAnimationsModule } from '@angular/platform-browser/animations';
import {ToastModule} from 'primeng/toast';


@NgModule({
  declarations: [ListHouseOwnerComponent],
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
    ReactiveFormsModule,
    BrowserAnimationsModule,
    ToastModule
  ]
})
export class ListHouseOwnerModule { }
