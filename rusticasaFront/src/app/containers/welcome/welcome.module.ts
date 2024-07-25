import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WelcomeComponent } from './welcome/welcome.component';
import { CasaService } from 'src/app/shared/services/casa.service';
import { CarouselModule } from 'primeng/carousel';

@NgModule({
  declarations: [WelcomeComponent],
  imports: [CommonModule, CarouselModule],
  providers: [CasaService],
})
export class WelcomeModule {}
