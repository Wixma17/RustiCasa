import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HouseRequestComponent } from './house-request/house-request.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { InputTextModule } from 'primeng/inputtext';
import { CheckboxModule } from 'primeng/checkbox';
import { CommonComponentsModule } from 'src/app/common-components/common-components.module';
import { SliderModule } from 'primeng/slider';
import { PaginatorModule } from 'primeng/paginator';
import { ToastModule } from 'primeng/toast'; // Importar ToastModule
import { BrowserAnimationsModule, NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MessageService } from 'primeng/api'; // Importar MessageService

@NgModule({
  declarations: [HouseRequestComponent],
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
    ToastModule, // Agregar ToastModule
    NoopAnimationsModule,
    BrowserAnimationsModule
  ],
  providers: [MessageService] // Registrar MessageService en los proveedores
})
export class HouseRequestModule { }
