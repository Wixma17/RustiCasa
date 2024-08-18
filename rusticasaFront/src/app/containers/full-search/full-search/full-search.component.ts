import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SelectItem } from 'primeng/api';
import { RequestCasaSimple } from 'src/app/shared/model/requests/request-casa-simple.model';
import { CasaResponse } from 'src/app/shared/model/responses/casa-response.model';
import { MunicipioResponse } from 'src/app/shared/model/responses/municipio-response.model';
import { ProvinciaResponse } from 'src/app/shared/model/responses/provincia-response.model';
import { BreadcrumbService } from 'src/app/shared/services/breadcrumb.service';
import { CasaService } from 'src/app/shared/services/casa.service';
import { FiltroService } from 'src/app/shared/services/filtro.service';
import { MunicipioService } from 'src/app/shared/services/municipio.service';
import { ProvinciaService } from 'src/app/shared/services/provincia.service';

@Component({
  selector: 'app-full-search',
  templateUrl: './full-search.component.html',
  styleUrls: ['./full-search.component.scss'],
})
export class FullSearchComponent implements OnInit {
  pageCasa: any;
  formuReact: FormGroup;
  casasPaginadas: any[] = []; // La lista filtrada para mostrar en la página actual
  rows: number = 10; // Número de elementos por página
  currentPage: number = 0; // Página actual
  precioMax: number = 0;
  precioMin: number = 0;
  listaProv: ProvinciaResponse[];
  ListadoProvincias: SelectItem[] = [];
  listaMunicipio: MunicipioResponse[];
  listadoPueblos: SelectItem[] = [];
  idProv: number;

  constructor(
    private casaService: CasaService,
    private formubuild: FormBuilder,
    private filterService: FiltroService,
    private provinciaService: ProvinciaService,
    private municipioService: MunicipioService
  ) {
  /* this.formuReact = this.formubuild.group({
      piscina: [false],
      wifi: [false],
      jardin: [false],
      mascotas: [false],
      precioValor: [[0, this.precioMax]],
      provinciasS: [0],
      fechas: [null, [Validators.required]],
      pueblos: [0],
      nInquilinos: [],
      nHabitaciones: [],
    });*/
  }

  ngOnInit(): void {
    //-------------CargaProv-------------
    this.provinciaService.getListaProvincias().subscribe({
      next: (prov) => {
        this.listaProv = [];
        this.listaProv = prov;
      },
      error: (err) => {
        console.error('Error=> ' + err);
      },
      complete: () => {
        this.ListadoProvincias.push({
          label: '--Selecciona la provincia--',
          value: null,
        });

        this.listaProv.forEach((prov) => {
          this.ListadoProvincias.push({
            label: prov.nombreProvincia,
            value: prov.idPronvincia,
          });
        });
        console.info(this.ListadoProvincias);
      },
    });

    //-----------------------------------
    this.casaService.getPrecioAltoNoche().subscribe({
      next: (maxPrecio) => {
        this.precioMax = maxPrecio;
        console.info('precio maximo=> ' + this.precioMax);
        this.formuReact.get('precioValor').setValue([0, this.precioMax]);
      },
      error: (err) => {
        console.error('Error al obtener el precio máximo', err);
      },
    });

    this.casaService.getPrecioBajoNoche().subscribe({
      next: (minPrecio) => {
        this.precioMin = minPrecio;
        console.info('precio minimo=> ' + this.precioMin);
        this.formuReact
          .get('precioValor')
          .setValue([this.precioMin, this.precioMax]);
      },
      error: (err) => {
        console.error('Error al obtener el precio minimo', err);
      },
    });

    if (sessionStorage.getItem('busquedaCasa') !== undefined) {
      this.actualizarCasasPaginadas();
      const datosBusquedas = JSON.parse(sessionStorage.getItem('busquedaCasa'));

      this.formuReact = this.formubuild.group({
        piscina: [false],
        wifi: [false],
        jardin: [false],
        mascotas: [false],
        precioValor: [[this.precioMin, this.precioMax]],
        provinciasS: [datosBusquedas.codProv || null],
        fechas: [
          [
            new Date(datosBusquedas.checkIn),
            new Date(datosBusquedas.checkOut)
          ],
          [Validators.required]
        ],
        pueblos: [datosBusquedas.codMun || null],
        nInquilinos: [datosBusquedas.numInqui || null],
        nHabitaciones: [datosBusquedas.numHab || null],
      });
    }

    let casasGuardadas = sessionStorage.getItem('listaCasas');

    if (casasGuardadas) {
      this.pageCasa = JSON.parse(casasGuardadas);
    } else {
      this.filterService.listaCasa$.subscribe((data) => {
        this.pageCasa = data;
        sessionStorage.setItem('listaCasas', JSON.stringify(data));
      });
    }
  }

  onPageChange(event: any) {
    this.currentPage = event.page;
    this.actualizarCasasPaginadas();
  }

  actualizarCasasPaginadas() {
    let paramBusqueda: RequestCasaSimple = JSON.parse(
      sessionStorage.getItem('busquedaCasa')
    );
    paramBusqueda.page = this.currentPage;
    this.filterService.getBusquedaSimple(paramBusqueda).subscribe({
      next:(data)=>{
        this.pageCasa=data;
        this.casasPaginadas=this.pageCasa.content
      },
      error:(err)=>{
        console.error(err)
      },
      complete:()=>{
        console.info("Pagination ok");
      }
    });
  }


  cargaPueblos(): void {
    this.listaMunicipio = [];
    this.listadoPueblos = [];
    this.idProv = this.formuReact.value.provinciasS;

    console.info(this.listaMunicipio);

    this.municipioService.getListaMunicipio(this.idProv).subscribe({
      next: (mun) => {
        this.listaMunicipio = mun;
        console.info(this.listaMunicipio);
      },
      error: (err) => {
        console.error(err);
      },
      complete: () => {
        this.listadoPueblos.push({
          label: '--Selecciona la provincia--',
          value: null,
        });

        this.listaMunicipio.forEach((muni) => {
          this.listadoPueblos.push({
            label: muni.municipio,
            value: muni.idMunicipio,
          });
        });
        console.info('Cargado pueblos de la provincia con id=> ' + this.idProv);
      },
    });
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

    console.info(
      'Provincia=> ' + this.formuReact.controls['provinciasS'].value
    );

    console.info(
      'Provincia=> ' + this.formuReact.controls['pueblos'].value
    );
  }
}
