import { Injectable } from '@angular/core';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { BehaviorSubject, Observable } from 'rxjs';
import { filter } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class BreadcrumbService {
  private breadcrumbsSubject = new BehaviorSubject<Array<{ label: string, routerLink?: string }>>([]);
  breadcrumbs$: Observable<Array<{ label: string, routerLink?: string }>> = this.breadcrumbsSubject.asObservable();

  constructor(private router: Router,private activatedRoute:ActivatedRoute) {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      console.info(this.activatedRoute.root.snapshot.data)
      this.updateBreadcrumbs(this.activatedRoute.root);
    });
  }

  private updateBreadcrumbs(route: any, breadcrumbs:Array<{ label: string, routerLink?: string }>=[]): void {
    console.info(route.snapshot.data)
    if (route.snapshot.data.breadcrumb) {
      let menuItems = route.snapshot.data.breadcrumb;
      breadcrumbs=menuItems;
    }

    this.breadcrumbsSubject.next(breadcrumbs);
  }
}
