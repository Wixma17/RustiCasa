import { AfterViewInit, Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs/operators';
import { Dropdown } from 'bootstrap';
import { Collapse } from 'bootstrap';
import { BusquedasService } from 'src/app/shared/services/busquedas.service';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit,AfterViewInit {
  nombreCasa: string = '';
  muestraBusqueda: boolean = true;
  datosUsu:any;

  constructor(private busqueda: BusquedasService,private authService: AuthService,private router: Router,) {}


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

    this.authService.userData$.subscribe((data) => {
      this.datosUsu = data;
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
    sessionStorage.removeItem("datosUsu");
    this.router.navigate(['/login']);
  }
}
