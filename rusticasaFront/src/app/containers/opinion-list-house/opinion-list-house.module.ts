import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OpinionListHouseComponent } from './opinion-list-house/opinion-list-house.component';
import {CardModule} from 'primeng/card';
import {RatingModule} from 'primeng/rating';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [OpinionListHouseComponent],
  imports: [
    CommonModule,
    CardModule,
    RatingModule,
    FormsModule
  ]
})
export class OpinionListHouseModule { }
