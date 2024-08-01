import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FullSearchComponent } from './full-search/full-search.component';
import { FormsModule } from '@angular/forms';
import {ButtonModule} from 'primeng/button';
import {RippleModule} from 'primeng/ripple';
import { InputTextModule } from 'primeng/inputtext';
import { CommonComponentsModule } from 'src/app/common-components/common-components.module';



@NgModule({
  declarations: [FullSearchComponent],
  imports: [
    CommonModule,
    FormsModule,
    ButtonModule,
    RippleModule,
    InputTextModule,
    CommonComponentsModule
  ]
})
export class FullSearchModule { }
