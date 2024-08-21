import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HouseComponent } from './house/house.component';
import { CasaService } from '../shared/services/casa.service';
import { CarouselModule } from 'primeng/carousel';
import { PipesModule } from '../shared/pipes/pipes.module';
import {RatingModule} from 'primeng/rating';
import { FormsModule } from '@angular/forms';
import { MapaComponent } from './mapa/mapa.component';



@NgModule({
  declarations: [HouseComponent, MapaComponent],
  imports: [
    CommonModule,
    CarouselModule,
    PipesModule,
    RatingModule,
    FormsModule
  ],
  exports:[
    HouseComponent,
    MapaComponent
  ],
  providers:[
    CasaService
  ]
})
export class CommonComponentsModule { }
