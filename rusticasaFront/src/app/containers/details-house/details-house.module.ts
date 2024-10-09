import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DetailsHouseComponent } from './details-house/details-house.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RatingModule } from 'primeng/rating';
import { PipesModule } from 'src/app/shared/pipes/pipes.module';
import { CarouselModule } from 'primeng/carousel';
import { CommonComponentsModule } from 'src/app/common-components/common-components.module';
import { MessagesModule } from 'primeng/messages';
import { ToastModule } from 'primeng/toast';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { ButtonModule } from 'primeng/button';


@NgModule({
  declarations: [DetailsHouseComponent],
  imports: [
    CommonModule,
    CarouselModule,
    PipesModule,
    RatingModule,
    FormsModule,
    CommonComponentsModule,
    FormsModule,
    ReactiveFormsModule,
    ToastModule,
    MessagesModule,
    BrowserAnimationsModule,
    InputTextareaModule,
    ButtonModule
  ],
})
export class DetailsHouseModule {}
