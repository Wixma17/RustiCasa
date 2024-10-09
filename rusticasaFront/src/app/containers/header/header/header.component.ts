import { ClienteService } from './../../../shared/services/cliente.service';
import { AfterViewInit, Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter, switchMap } from 'rxjs/operators';
import { Dropdown } from 'bootstrap';
import { Collapse } from 'bootstrap';
import { BusquedasService } from 'src/app/shared/services/busquedas.service';
import { AuthService } from 'src/app/shared/services/auth.service';
import { SafeResourceUrl } from '@angular/platform-browser';
import { CasaService } from 'src/app/shared/services/casa.service';
import { of } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit, AfterViewInit {
  nombreCasa: string = '';
  muestraBusqueda: boolean = true;
  datosUsu: any;
  ruta: SafeResourceUrl;
  nSolicitudes:any;

  constructor(
    private busqueda: BusquedasService,
    private authService: AuthService,
    private router: Router,
    private clienteService:ClienteService,
    private casaService:CasaService
  ) {}

  private collapseElement!: HTMLElement;

  ngAfterViewInit() {
    this.collapseElement = document.getElementById('navToggle') as HTMLElement;

    if (this.collapseElement) {
      // Inicializar el colapso de Bootstrap
      const collapse = new Collapse(this.collapseElement, {
        toggle: false, // No se colapsa automáticamente al cargar
      });

      // Escuchar el evento `hidden.bs.collapse` que se dispara cuando la animación termina
      this.collapseElement.addEventListener('hidden.bs.collapse', () => {
        this.collapseElement.classList.remove('show');
      });

      // Escuchar el evento `shown.bs.collapse` que se dispara cuando la animación termina
      this.collapseElement.addEventListener('shown.bs.collapse', () => {
        this.collapseElement.classList.add('show');
      });
    }
  }

  toggleCollapse() {
    const isExpanded = this.collapseElement.classList.contains('show');
    if (isExpanded) {
      new Collapse(this.collapseElement).hide();
    } else {
      new Collapse(this.collapseElement).show();
    }
  }

  ngOnInit(): void {
    this.authService.userData$.pipe(
      switchMap((data) => {
        this.datosUsu = data;
        if (this.datosUsu) {
          console.log(this.datosUsu);
          return this.casaService.getNumeroSolicitudPorGmail(this.datosUsu.gmail);
        } else {
          // Si no hay usuario, devuelve un observable vacío o 0
          return of(0); // Necesitas importar `of` de 'rxjs'
        }
      })
    ).subscribe((n) => {
      this.nSolicitudes = n;
    });

    this.authService.rutaImg$.subscribe((url) => {
      this.ruta = url;
    });
  }

  toggleDropdown() {
    const dropdownElement = document.querySelector('.dropdown-menu');
    if (dropdownElement) {
      const dropdown = new Dropdown(dropdownElement);
      if (dropdownElement.classList.contains('show')) {
        dropdown.hide();
      } else {
        dropdown.show();
      }
    }
  }

  logout() {
    this.authService.clearUserData();
    sessionStorage.removeItem('datosUsu');
    this.router.navigate(['/login']);
  }
}
