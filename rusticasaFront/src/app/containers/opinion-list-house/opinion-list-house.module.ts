import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OpinionListHouseComponent } from './opinion-list-house/opinion-list-house.component';
import {CardModule} from 'primeng/card';
import {RatingModule} from 'primeng/rating';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PaginatorModule } from 'primeng/paginator';
import {InputTextareaModule} from 'primeng/inputtextarea';



@NgModule({
  declarations: [OpinionListHouseComponent],
  imports: [
    CommonModule,
    CardModule,
    RatingModule,
    FormsModule,
    PaginatorModule,
    InputTextareaModule,
    ReactiveFormsModule
  ]
})
export class OpinionListHouseModule { }
