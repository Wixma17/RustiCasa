import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CabeceraComponent } from './cabecera/cabecera.component';
import {ButtonModule} from 'primeng/button';


@NgModule({
  declarations: [CabeceraComponent],
  imports: [
    CommonModule,
    ButtonModule
  ],
  exports:[
    CabeceraComponent
  ]
})
export class CabeceraModule {
}
