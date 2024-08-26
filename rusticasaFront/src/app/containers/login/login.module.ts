import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import {InputTextModule} from 'primeng/inputtext';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import {ToggleButtonModule} from 'primeng/togglebutton';


@NgModule({
  declarations: [LoginComponent],
  imports: [
    CommonModule,
    InputTextModule,
    FormsModule,
    RouterModule,
    ButtonModule,
    RippleModule,
    ReactiveFormsModule,
    ToggleButtonModule
  ],
  exports:[LoginComponent]
})
export class LoginModule { }
