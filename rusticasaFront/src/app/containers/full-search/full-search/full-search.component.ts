import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SelectItem } from 'primeng/api';
import { RequestCasaAvanzada } from 'src/app/shared/model/requests/request-casa-avanzada.model';
import { RequestCasaSimple } from 'src/app/shared/model/requests/request-casa-simple.model';
import { CasaResponse } from 'src/app/shared/model/responses/casa-response.model';
import { MunicipioResponse } from 'src/app/shared/model/responses/municipio-response.model';
import { ProvinciaResponse } from 'src/app/shared/model/responses/provincia-response.model';
import { BreadcrumbService } from 'src/app/shared/services/breadcrumb.service';
import { CasaService } from 'src/app/shared/services/casa.service';
import { FiltroService } from 'src/app/shared/services/filtro.service';
import { MunicipioService } from 'src/app/shared/services/municipio.service';
import { ProvinciaService } from 'src/app/shared/services/provincia.service';
import { Toast } from 'bootstrap';
import { Dropdown } from 'primeng/dropdown';

@Component({
  selector: 'app-full-search',
  templateUrl: './full-search.component.html',
  styleUrls: ['./full-search.component.scss'],
})
export class FullSearchComponent implements OnInit {
  @ViewChild('selectPueblos') selectPueblos!: Dropdown;

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
  provSele: String = '-- Selecciona la provincia --';
  muniSele: String = '-- Selecciona el municipio --';
  listaResultCasa: CasaResponse[];
  usuarioLog: any;

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

    this.usuarioLog = JSON.parse(sessionStorage.getItem('datosUsu'));

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
          label: '-- Selecciona la provincia --',
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

    if (sessionStorage.getItem('busquedaCasa') !== null) {
      this.actualizarCasasPaginadas();
      const datosBusquedas = JSON.parse(sessionStorage.getItem('busquedaCasa'));

      //------------------------------------------------------

      this.formuReact = this.formubuild.group({
        piscina: [false],
        wifi: [false],
        jardin: [false],
        mascotas: [false],
        precioValor: [[this.precioMin, this.precioMax]],
        provinciasS: [datosBusquedas.codProv || null],
        fechas: [
          [new Date(datosBusquedas.checkIn), new Date(datosBusquedas.checkOut)],
          [Validators.required],
        ],
        pueblos: [datosBusquedas.codMun || null],
        nInquilinos: [datosBusquedas.numInqui || null],
        nHabitaciones: [datosBusquedas.numHab || null],
      });

      //------------Poner Municipio y Provincia---------------
      if(datosBusquedas.codProv != null){
        this.provinciaService
        .getNombreProvincia(datosBusquedas.codProv)
        .subscribe({
          next: (provincia) => {
            this.provSele = provincia.nombre;
            this.municipioService
              .getNombreMunicipio(datosBusquedas.codMun)
              .subscribe({
                next: (municipio) => {
                  this.muniSele = municipio.nombre;
                },
                error: (err) => {
                  console.error(err);
                },
                complete: () => {
                  console.info('nombre Mun=> ' + this.muniSele);
                },
              });
          },
          error: (err) => {
            console.error(err);
          },
          complete: () => {
            console.info('nombre Prov=> ' + this.provSele);
          },
        });
      }
    } else {
      this.formuReact = this.formubuild.group({
        piscina: [false], // Booleano
        wifi: [false], // Booleano
        jardin: [false], // Booleano
        mascotas: [false], // Booleano
        precioValor: [[this.precioMin, this.precioMax]], // Array de dos números
        provinciasS: [null], // ID de la provincia (número o null)
        fechas: [[new Date(), new Date()], [Validators.required]], // Array de dos fechas
        pueblos: [null], // ID del municipio (número o null)
        nInquilinos: [null], // Número de inquilinos
        nHabitaciones: [null], // Número de habitaciones
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
      next: (data) => {
        this.pageCasa = data;
        this.casasPaginadas = this.pageCasa.content;
      },
      error: (err) => {
        console.error(err);
      },
      complete: () => {
        console.info('Pagination ok');
      },
    });
  }

  cargaPueblos(): void {
    this.listaMunicipio = [];
    this.listadoPueblos = [];
    this.idProv = this.formuReact.value.provinciasS;
    if (this.idProv) {
      this.municipioService.getListaMunicipio(this.idProv).subscribe({
        next: (mun) => {
          this.listaMunicipio = mun;
          console.info(this.listaMunicipio);
        },
        error: (err) => {
          console.error(err);
        },
        complete: () => {
          this.selectPueblos.setDisabledState(false);
          this.muniSele = '-- Seleccione el municipio --'
          this.listadoPueblos.push({
            label: '-- Selecciona el municipio --',
            value: null,
          });

          this.listaMunicipio.forEach((muni) => {
            this.listadoPueblos.push({
              label: muni.municipio,
              value: muni.idMunicipio,
            });
          });
          console.info(
            'Cargado pueblos de la provincia con id=> ' + this.idProv
          );
        },
      });
    } else {
      this.provSele = '-- Selecciona la provincia --';
      this.muniSele = '-- Selecciona el municipio --';
      this.formuReact.value.provinciasS = null;
      this.formuReact.value.pueblos = null;
      this.selectPueblos.setDisabledState(true);
    }
  }

  buscaFiltro() {
    let casasGuardadas = sessionStorage.getItem('busquedaCasa');
    let listaCasasGuardadas = sessionStorage.getItem('listaCasas');

    if (casasGuardadas !== null) {
      sessionStorage.removeItem('busquedaCasa');
    }

    if (listaCasasGuardadas !== null) {
      sessionStorage.removeItem('listaCasas');
    }

    let requestAvanzada: RequestCasaAvanzada = {
      mascotas: !!this.formuReact.controls['mascotas'].value,
      wifi: !!this.formuReact.controls['wifi'].value,
      jardin: !!this.formuReact.controls['jardin'].value,
      piscina: !!this.formuReact.controls['piscina'].value,
      precioMin: this.formuReact.controls['precioValor'].value[0],
      precioMax: this.formuReact.controls['precioValor'].value[1],
      inquilinos: this.formuReact.controls['nInquilinos'].value,
      numHab: this.formuReact.controls['nHabitaciones'].value,
      checkIn: this.formuReact.controls['fechas'].value[0],
      checkOut: this.formuReact.controls['fechas'].value[1],
      codProv: this.formuReact.controls['provinciasS'].value,
      codMun: this.formuReact.controls['pueblos'].value,
    };

    sessionStorage.setItem('busquedaCasa', JSON.stringify(requestAvanzada));

    this.filterService.getBusquedaAvanzada(requestAvanzada).subscribe({
      next: (casa) => {
        this.listaResultCasa = casa;
        this.filterService.setListaCasa(this.listaResultCasa);
      },
      error: (err) => {
        console.error(err);
      },
      complete: () => {
        console.info('COMPLETADA LA CARGA CON FILTRO AVANZADO');
      },
    });

    this.actualizarCasasPaginadas();
    const toastElement = document.getElementById('liveToast');
    if (toastElement) {
      const toast = new Toast(toastElement);
      toast.show(); // Muestra el toast
    }
  }

  eliminaCasa(idCasa){
    this.casaService.eliminarCasa(idCasa).subscribe({
      next:()=>{
      },
      error:(err)=>{
        console.error(err);
      },
      complete:()=>{
        console.info("Casa Eliminada con éxito");
        window.location.reload();
      }
    });
  }
}
