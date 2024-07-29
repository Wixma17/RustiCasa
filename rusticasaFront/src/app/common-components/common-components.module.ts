import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HouseComponent } from './house/house.component';
import { CasaService } from '../shared/services/casa.service';
import { CarouselModule } from 'primeng/carousel';



@NgModule({
  declarations: [HouseComponent],
  imports: [
    CommonModule,
    CarouselModule
  ],
  exports:[
    HouseComponent
  ],
  providers:[
    CasaService
  ]
})
export class CommonComponentsModule { }
