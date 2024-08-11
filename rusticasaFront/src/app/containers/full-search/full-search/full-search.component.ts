import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CasaResponse } from 'src/app/shared/model/responses/casa-response.model';
import { CasaService } from 'src/app/shared/services/casa.service';
import { FiltroService } from 'src/app/shared/services/filtro.service';

@Component({
  selector: 'app-full-search',
  templateUrl: './full-search.component.html',
  styleUrls: ['./full-search.component.scss'],
})
export class FullSearchComponent implements OnInit {
  listaCasas: CasaResponse[] = [];
  formuReact: FormGroup;
  casasPaginadas: any[] = []; // La lista filtrada para mostrar en la página actual
  rows: number = 10; // Número de elementos por página
  currentPage: number = 0; // Página actual
  precioMax: number = 0;
  precioMin: number = 0;

  constructor(
    private casaService: CasaService,
    private formubuild: FormBuilder,
    private filterService: FiltroService
  ) {
    this.formuReact = this.formubuild.group({
      piscina: [false],
      wifi: [false],
      jardin: [false],
      mascotas: [false],
      precioValor: [[0, this.precioMax]],
    });
  }

  ngOnInit(): void {
    this.casaService.getPrecioAltoNoche().subscribe({
      next: (maxPrecio) => {
        console.info('precio maximo=> ' + maxPrecio);
        this.precioMax = maxPrecio;
        this.formuReact.get('precioValor').setValue([0, this.precioMax]);
      },
      error: (err) => {
        console.error('Error al obtener el precio máximo', err);
      },
    });

    this.casaService.getPrecioBajoNoche().subscribe({
      next: (minPrecio) => {
        console.info('precio minimo=> ' + minPrecio);
        this.precioMin = minPrecio;
        this.formuReact.get('precioValor').setValue([this.precioMin, this.precioMax]);
      },
      error: (err) => {
        console.error('Error al obtener el precio minimo', err);
      },
    });

    /* this.filterService.listaCasa$.subscribe(data => {
      this.listaCasas = data;
    });*/

    let casasGuardadas = localStorage.getItem('listaCasas');

    if (casasGuardadas) {
      this.listaCasas = JSON.parse(casasGuardadas);
    } else {
      this.filterService.listaCasa$.subscribe((data) => {
        this.listaCasas = data;
        localStorage.setItem('listaCasas', JSON.stringify(data));
      });
    }
    this.actualizarCasasPaginadas();
  }

  onPageChange(event: any) {
    this.currentPage = event.page;
    this.actualizarCasasPaginadas();
  }

  actualizarCasasPaginadas() {
    const start = this.currentPage * this.rows;
    const end = start + this.rows;
    this.casasPaginadas = this.listaCasas.slice(start, end);
  }

  buscaFiltro() {
    console.info('piscina=> ' + this.formuReact.controls['piscina'].value);
    console.info('wifi=> ' + this.formuReact.controls['wifi'].value);
    console.info('jardin=> ' + this.formuReact.controls['jardin'].value);
    console.info('mascotas=> ' + this.formuReact.controls['mascotas'].value);

    console.info(
      'precioMax=> ' + this.formuReact.controls['precioValor'].value[0]
    );
    console.info(
      'precioMin=> ' + this.formuReact.controls['precioValor'].value[1]
    );
  }
}
