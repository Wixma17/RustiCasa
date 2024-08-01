import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder,Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { CasaResponse } from 'src/app/shared/model/responses/casa-response.model';
import { BusquedasService } from 'src/app/shared/services/busquedas.service';
import { CasaService } from 'src/app/shared/services/casa.service';

@Component({
  selector: 'app-full-search',
  templateUrl: './full-search.component.html',
  styleUrls: ['./full-search.component.scss'],
})
export class FullSearchComponent implements OnInit, OnDestroy {
  valorBusqueda: string = '';
  listaCasas: CasaResponse[] = [];
  formuReact: any;

  private paramBusquedaSuscription: Subscription;

  constructor(
    private busquedaService: BusquedasService,
    private casaService: CasaService,
    private formubuild: FormBuilder
  ) {}

  ngOnInit(): void {
    this.paramBusquedaSuscription = this.busquedaService
      .getParamBusqueda()
      .subscribe({
        next: (param) => {
          this.valorBusqueda = param;
          if (param != '') {
            this.buscarCasa();
          }
        },
        error: (err) => {
          console.error(err);
        },
        complete: () => {},
      });

      this.formuReact = this.formubuild.group({
        nombreCasa: [''],
        piscina: [false],
        wifi: [false],
        jardin: [false],
        mascotas: [false],
      });

  }

  ngOnDestroy(): void {
    this.busquedaService.setParamBusqueda('');
    this.paramBusquedaSuscription.unsubscribe();
  }

  buscarCasa(): void {
    this.casaService.getListaCasasPorNombre(this.valorBusqueda).subscribe({
      next: (listaCasas) => {
        this.listaCasas = listaCasas;
        console.log(listaCasas);
      },
      error: (err) => {
        console.error(err);
      },
      complete: () => {
        console.info(
          `Carga de casas según el parámetro de búsqueda ${this.valorBusqueda} completado`
        );
      },
    });
  }

  cambiarParam(): void {
    this.busquedaService.setParamBusqueda(this.valorBusqueda);
  }
}
