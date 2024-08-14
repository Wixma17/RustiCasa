import { Component, OnInit } from '@angular/core';
import {MenuItem} from 'primeng/api';
import { BreadcrumbService } from './shared/services/breadcrumb.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'rusticasaFront';

  items:Array<{ label: string, routerLink?: string }> = [];

  constructor(private breadcrumbService: BreadcrumbService) {}

  ngOnInit() {
    this.breadcrumbService.breadcrumbs$.subscribe(breadcrumbs => {
      this.items = breadcrumbs;
    });
  }
}
