import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder,FormGroup,Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { CasaResponse } from 'src/app/shared/model/responses/casa-response.model';
import { BusquedasService } from 'src/app/shared/services/busquedas.service';
import { CasaService } from 'src/app/shared/services/casa.service';
import { FiltroService } from 'src/app/shared/services/filtro.service';

@Component({
  selector: 'app-full-search',
  templateUrl: './full-search.component.html',
  styleUrls: ['./full-search.component.scss'],
})
export class FullSearchComponent implements OnInit, OnDestroy {
  listaCasas: CasaResponse[] = [];
  formuReact: FormGroup;
  listaResultCasa: CasaResponse[] = [];

  constructor(
    private casaService: CasaService,
    private formubuild: FormBuilder,
    private filterService:FiltroService
  ) {

  }

  ngOnInit(): void {
    this.formuReact = this.formubuild.group({
      piscina: [false],
      wifi: [false],
      jardin: [false],
      mascotas: [false],
      precioValor:[[0,100]]
    });

    this.filterService.listaCasa$.subscribe(data => {
      this.listaResultCasa = data;
    });
  }

  ngOnDestroy(): void {
    /*this.listaCasa.unsubscribe();*/
  }

  buscarCasa(): void {
    this.casaService.getListaCasasPorNombre(this.formuReact.get('nombreCasa').value).subscribe({
      next: (listaCasas) => {
        this.listaCasas = listaCasas;
        console.log(listaCasas);
      },
      error: (err) => {
        console.error(err);
      },
      complete: () => {
        console.info(
          `Carga de casas según el parámetro de búsqueda ${this.formuReact.get('nombreCasa').value} completado`
        );
      },
    });
  }

 /* cambiarParam(): void {
    this.busquedaService.setParamBusqueda(this.formuReact.get('nombreCasa').value);
  }*/
}
