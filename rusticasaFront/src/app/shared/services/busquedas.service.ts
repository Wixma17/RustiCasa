import { Injectable } from '@angular/core';
import { CasaService } from './casa.service';
import { Router } from '@angular/router';
import { CasaResponse } from '../model/responses/casa-response.model';

@Injectable({
  providedIn: 'root',
})
export class BusquedasService {
  resultados: CasaResponse[] = [];

  muestraBusquedaCabecera: boolean = true;

  constructor(private casaS: CasaService, private router: Router) {}

  buscar(nombreCasa: string): void {
    this.casaS.getListaCasasPorNombre(nombreCasa).subscribe({
      next: (casa) => {
        console.log(casa);
      },
      complete: () => {
        this.router.navigate(['/full-search']);
      },
    });
  }
}
