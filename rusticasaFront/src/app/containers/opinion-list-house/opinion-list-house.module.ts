import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OpinionListHouseComponent } from './opinion-list-house/opinion-list-house.component';
import {CardModule} from 'primeng/card';
import {RatingModule} from 'primeng/rating';



@NgModule({
  declarations: [OpinionListHouseComponent],
  imports: [
    CommonModule,
    CardModule,
    RatingModule
  ]
})
export class OpinionListHouseModule { }
