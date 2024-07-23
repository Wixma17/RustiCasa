import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WelcomeComponent } from './welcome/welcome.component';
import { CasaService } from 'src/app/shared/services/casa.service';



@NgModule({
  declarations: [WelcomeComponent],
  imports: [
    CommonModule
  ],
  providers:[
    CasaService
  ]
})
export class WelcomeModule { }
