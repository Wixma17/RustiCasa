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
import { TranslateService } from '@ngx-translate/core';
import { ClienteService } from 'src/app/shared/services/cliente.service';
import { SafeResourceUrl } from '@angular/platform-browser';

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
  datosUsu: any;
  buscaUsuFormu:FormGroup;
  listaUsuarios: SelectItem[]=[];
  usuarioSelect: any;
  usuarioSeleccionado: any;
  ruta: SafeResourceUrl;

  constructor(
    private formubuild: FormBuilder,
    private provinciaService: ProvinciaService,
    private municipioService: MunicipioService,
    private filtroService: FiltroService,
    private router: Router,
    private translate: TranslateService,
    private servicioCliente: ClienteService
  ) {
    this.buscaFormu = this.formubuild.group({
      provinciasS: [0],
      fechas: [null, [Validators.required]],
      pueblos: [0],
      nInquilinos: [],
      nHabitaciones: [],
    });

    this.translate.setDefaultLang('es');
  }

  ngOnInit(): void {
    this.datosUsu = JSON.parse(sessionStorage.getItem('datosUsu'));

    if (this.datosUsu?.administrador) {
      this.servicioCliente.getListaCliente().subscribe((lista) => {
        const usuariosConDatos = lista.map((element) => {
          return { label: element.gmail, value: element };
        });

        this.listaUsuarios = usuariosConDatos;

        // Inicializa el formulario reactivo
        this.buscaUsuFormu = this.formubuild.group({
          usuarioSelect: []
        });

        // Suscribirse a los cambios del control `usuarioSelect`
        this.buscaUsuFormu.get('usuarioSelect')?.valueChanges.subscribe((value) => {
          this.usuarioSeleccionado = value;
          this.servicioCliente.getRutaFotoPerfil(this.usuarioSeleccionado.gmail).subscribe((rut)=>{
            this.ruta=rut.urlImg;
          });
        });
      });
    }

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
    sessionStorage.removeItem('listaCasas');

    // Verifica si el formulario es válido
    if (this.buscaFormu.invalid) {
      console.log('Formulario inválido');
      return;
    }

    let requestCasa: RequestCasaSimple = {
      codProv:
        this.buscaFormu.value.provinciasS !== 0
          ? this.buscaFormu.value.provinciasS
          : null,
      codMun:
        this.buscaFormu.value.pueblos !== 0
          ? this.buscaFormu.value.pueblos
          : null,
      checkIn: this.buscaFormu.value.fechas[0],
      checkOut: this.buscaFormu.value.fechas[1],
      numInqui: this.buscaFormu.value.nInquilinos,
      numHab: this.buscaFormu.value.nHabitaciones,
    };

    sessionStorage.setItem('busquedaCasa', JSON.stringify(requestCasa));

    this.filtroService.getBusquedaSimple(requestCasa).subscribe({
      next: (casa) => {
        this.listaResultCasa = casa;
        this.filtroService.setListaCasa(this.listaResultCasa);
      },
      error: (err) => {
        console.error(err);
      },
      complete: () => {
        this.router.navigate(['/full-search']);
      },
    });
  }

  cambiarIdioma(): void {
    // Cambiar entre idiomas
    const currentLang = this.translate.currentLang;
    const newLang = currentLang === 'es' ? 'en' : 'es'; // Cambiar entre español e inglés

    this.translate.use(newLang); // Cambiar el idioma

    // Navegar a la misma ruta con el nuevo parámetro de idioma
    this.router.navigate([], {
      queryParams: { lang: newLang },
      queryParamsHandling: 'merge', // Para mantener otros parámetros en la URL
    });
  }
}
