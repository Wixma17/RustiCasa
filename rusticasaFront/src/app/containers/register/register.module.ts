import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegisterComponent } from './register/register.component';
import { CheckboxModule } from 'primeng/checkbox';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RippleModule } from 'primeng/ripple';
import { ButtonModule } from 'primeng/button';
import { RouterModule } from '@angular/router';
import { InputTextModule } from 'primeng/inputtext';
import { CalendarModule } from 'primeng/calendar';
import {FileUploadModule} from 'primeng/fileupload';
import {PasswordModule} from 'primeng/password';
import {ToggleButtonModule} from 'primeng/togglebutton';



@NgModule({
  declarations: [RegisterComponent],
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
    PasswordModule,
    ToggleButtonModule
  ]
})
export class RegisterModule { }
