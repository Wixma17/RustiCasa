import { Component, OnInit } from '@angular/core';
import {MenuItem} from 'primeng/api';
import { BreadcrumbService } from './shared/services/breadcrumb.service';
import { TranslateService } from '@ngx-translate/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'rusticasaFront';

  items:Array<{ label: string, routerLink?: string }> = [];
  home:MenuItem={icon:"pi pi-home", routerLink:"/welcome"}
  data:any;

  constructor(private breadcrumbService: BreadcrumbService,private translate: TranslateService) {
    this.translate.setDefaultLang('es');
  }

  ngOnInit() {
    this.breadcrumbService.breadcrumbs$.subscribe(breadcrumbs => {
      this.items = breadcrumbs;
    });
  }

}
