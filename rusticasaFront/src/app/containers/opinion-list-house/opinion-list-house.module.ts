import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OpinionListHouseComponent } from './opinion-list-house/opinion-list-house.component';
import {CardModule} from 'primeng/card';
import {RatingModule} from 'primeng/rating';
import { FormsModule } from '@angular/forms';
import { PaginatorModule } from 'primeng/paginator';



@NgModule({
  declarations: [OpinionListHouseComponent],
  imports: [
    CommonModule,
    CardModule,
    RatingModule,
    FormsModule,
    PaginatorModule
  ]
})
export class OpinionListHouseModule { }
