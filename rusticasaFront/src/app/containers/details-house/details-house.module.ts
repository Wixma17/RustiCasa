import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DetailsHouseComponent } from './details-house/details-house.component';
import { FormsModule } from '@angular/forms';
import { RatingModule } from 'primeng/rating';
import { PipesModule } from 'src/app/shared/pipes/pipes.module';
import { CarouselModule } from 'primeng/carousel';
import { CommonComponentsModule } from 'src/app/common-components/common-components.module';

@NgModule({
  declarations: [DetailsHouseComponent],
  imports: [
    CommonModule,
    CarouselModule,
    PipesModule,
    RatingModule,
    FormsModule,
    CommonComponentsModule
  ],
})
export class DetailsHouseModule {}
