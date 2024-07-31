import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HouseComponent } from './house/house.component';
import { CasaService } from '../shared/services/casa.service';
import { CarouselModule } from 'primeng/carousel';
import { PipesModule } from '../shared/pipes/pipes.module';



@NgModule({
  declarations: [HouseComponent],
  imports: [
    CommonModule,
    CarouselModule,
    PipesModule
  ],
  exports:[
    HouseComponent
  ],
  providers:[
    CasaService
  ]
})
export class CommonComponentsModule { }
