import { Router } from '@angular/router';
import { MunicipioService } from './../../../shared/services/municipio.service';
import { ProvinciaService } from './../../../shared/services/provincia.service';
import { Component, OnInit, Sanitizer } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SelectItem } from 'primeng/api';
import { RequestCasaSimple } from 'src/app/shared/model/requests/request-casa-simple.model';
import { MunicipioResponse } from 'src/app/shared/model/responses/municipio-response.model';
import { ProvinciaResponse } from 'src/app/shared/model/responses/provincia-response.model';
import { FiltroService } from 'src/app/shared/services/filtro.service';
import { CasaResponse } from 'src/app/shared/model/responses/casa-response.model';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss'],
})
export class WelcomeComponent implements OnInit {
  buscaFormu: FormGroup;
  ListadoProvincias: SelectItem[] = [];
  listadoPueblos: SelectItem[] = [];
  listaMunicipio: MunicipioResponse[];
  listaProv: ProvinciaResponse[];
  idProv: number;
  checkIn: Date;
  checkOut: Date;
  idMun: number;
  numInqui: number;
  numHabi: number;
  listaResultCasa: CasaResponse[];

  constructor(
    private formubuild: FormBuilder,
    private provinciaService: ProvinciaService,
    private municipioService: MunicipioService,
    private filtroService: FiltroService,
    private router: Router
  ) {
    this.buscaFormu = this.formubuild.group({
      provinciasS: [0],
      fechas: [null,[Validators.required]],
      pueblos: [0],
      nInquilinos: [],
      nHabitaciones: [],
    });
  }

  ngOnInit(): void {
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
  }

  cargaPueblos(): void {
    this.listaMunicipio = [];
    this.listadoPueblos = [];
    this.idProv = this.buscaFormu.value.provinciasS;

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

  validaForm(): void {
    this.buscaFormu.markAllAsTouched();

    // Verifica si el formulario es válido
    if (this.buscaFormu.invalid) {
      console.log('Formulario inválido');
      return;
    }

    this.checkIn = this.buscaFormu.value.fechas[0];
    this.checkOut = this.buscaFormu.value.fechas[1];

    this.idProv = this.buscaFormu.value.provinciasS !== 0 ? this.buscaFormu.value.provinciasS : null;
    this.idMun = this.buscaFormu.value.pueblos !== 0 ? this.buscaFormu.value.pueblos : null;
    this.numInqui = this.buscaFormu.value.nInquilinos;
    this.numHabi = this.buscaFormu.value.nHabitaciones;

    let requestCasa: RequestCasaSimple = {
      codProv: this.idProv,
      codMun: this.idMun,
      checkIn: this.checkIn,
      checkOut: this.checkOut,
      numInqui: this.numInqui,
      numHab: this.numHabi,
    };

    this.filtroService.getListaCasaProvincias(requestCasa).subscribe({
      next: (casa) => {
        this.listaResultCasa = casa;
        this.filtroService.setListaCasa(this.listaResultCasa);
      },
      error: (err) => {
        console.error(err);
      },
      complete: () => {
        this.router.navigate(['/full-search']);
      }
    });
  }

}
