import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs/operators';
import { BusquedasService } from 'src/app/shared/services/busquedas.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  nombreCasa: string = '';
  muestraBusqueda: boolean = true;

  constructor(private busqueda: BusquedasService, private router: Router) {}

  ngOnInit(): void {
    this.busqueda.getMuestraBusquedaCabecera().subscribe((state) => {
      this.muestraBusqueda = state;
    });
    this.busqueda.getParamBusqueda().subscribe((param) => {
      this.nombreCasa = param
    })
    this.router.events
      .pipe(
        filter((event) => event instanceof NavigationEnd)
      )
      .subscribe((event: NavigationEnd) => {
        console.log('Ruta actual:', event.urlAfterRedirects);
        let mostrar = true;
        if (event.urlAfterRedirects == "/full-search"){
          mostrar = !mostrar;
          this.nombreCasa = '';
        }
        this.busqueda.setMuestraBusquedaCabecera(mostrar);
      });
  }

  buscarCasa(): void {
    this.busqueda.setParamBusqueda(this.nombreCasa);
    this.busqueda.goBuscar();
  }
}
