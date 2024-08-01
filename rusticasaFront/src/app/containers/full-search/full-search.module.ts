import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FullSearchComponent } from './full-search/full-search.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {ButtonModule} from 'primeng/button';
import {RippleModule} from 'primeng/ripple';
import { InputTextModule } from 'primeng/inputtext';
import { CommonComponentsModule } from 'src/app/common-components/common-components.module';
import {CheckboxModule} from 'primeng/checkbox';
import {SliderModule} from 'primeng/slider';



@NgModule({
  declarations: [FullSearchComponent],
  imports: [
    CommonModule,
    FormsModule,
    ButtonModule,
    RippleModule,
    InputTextModule,
    CheckboxModule,
    CommonComponentsModule,
    ReactiveFormsModule,
    SliderModule
  ]
})
export class FullSearchModule { }
