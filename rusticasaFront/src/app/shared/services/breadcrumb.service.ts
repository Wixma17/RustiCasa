import { Injectable } from '@angular/core';
import { Router, NavigationEnd, ActivatedRoute, ActivatedRouteSnapshot } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { filter } from 'rxjs/operators';

@Injectable({
  providedIn: 'root' // Marca el servicio como inyectable a nivel raíz, por lo que estará disponible en toda la aplicación.
})
export class BreadcrumbService { // Declara el servicio BreadcrumbService.

  // Define un BehaviorSubject que almacena un array de objetos que representan las migas de pan (breadcrumbs).
  private breadcrumbsSubject = new BehaviorSubject<Array<{ label: string, routerLink?: string }>>([]);

  // Expone el BehaviorSubject como un Observable, para que otros componentes puedan suscribirse a los cambios de las migas de pan.
  breadcrumbs$: Observable<Array<{ label: string, routerLink?: string }>> = this.breadcrumbsSubject.asObservable();

  constructor(private router: Router, private activatedRoute: ActivatedRoute) {
    // Se suscribe a los eventos de navegación del Router y filtra para reaccionar solo cuando la navegación ha terminado (NavigationEnd).
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      // Cuando la navegación termina, se obtiene la ruta raíz (root) desde la ActivatedRoute.
      const root = this.activatedRoute.root;

      // Llama al método getBreadcrumbs para construir las migas de pan basadas en la ruta actual.
      const breadcrumbs = this.getBreadcrumbs(root);

      // Actualiza el BehaviorSubject con el nuevo array de migas de pan.
      this.breadcrumbsSubject.next(breadcrumbs);
    });
  }

  updateBreadcrumbs(breadcrumbs: Array<{ label: string, routerLink?: string }>) {
    this.breadcrumbsSubject.next(breadcrumbs);
  }

  // Método recursivo que construye las migas de pan (breadcrumbs) basándose en la estructura de rutas.
  private getBreadcrumbs(route: ActivatedRoute, breadcrumbs: Array<{ label: string, routerLink?: string }> = []): Array<{ label: string, routerLink?: string }> {

    // Obtiene los hijos de la ruta actual.
    const children: ActivatedRoute[] = route.children;

    // Si la ruta actual no tiene hijos, retorna el array de breadcrumbs acumulados hasta el momento.
    if (children.length === 0) {
      return breadcrumbs;
    }

    // Itera sobre los hijos de la ruta actual.
    for (const child of children) {
      // Obtiene el snapshot de la ruta activa, que contiene información estática sobre la ruta en el momento actual.
      const routeSnapshot: ActivatedRouteSnapshot = child.snapshot;

      // Extrae los datos de la ruta actual.
      const data = routeSnapshot.data;

      // Si la ruta actual tiene un dato de breadcrumb definido, lo agrega al array de breadcrumbs.
      if (data.breadcrumb) {
        breadcrumbs = [...breadcrumbs, ...data.breadcrumb];
      }

      // Llama recursivamente al mismo método para seguir construyendo las migas de pan con las rutas hijas.
      return this.getBreadcrumbs(child, breadcrumbs);
    }
  }
}
