import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DetailsHouseComponent } from './details-house/details-house.component';
import { FormsModule } from '@angular/forms';
import { RatingModule } from 'primeng/rating';
import { PipesModule } from 'src/app/shared/pipes/pipes.module';
import { CarouselModule } from 'primeng/carousel';

@NgModule({
  declarations: [DetailsHouseComponent],
  imports: [
    CommonModule,
    CommonModule,
    CarouselModule,
    PipesModule,
    RatingModule,
    FormsModule
  ],
})
export class DetailsHouseModule {}
