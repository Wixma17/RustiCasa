import { Router } from '@angular/router';
import { MunicipioService } from './../../../shared/services/municipio.service';
import { ProvinciaService } from './../../../shared/services/provincia.service';
import { Component, OnInit, Sanitizer } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService, PrimeNGConfig, SelectItem } from 'primeng/api';
import { RequestCasaSimple } from 'src/app/shared/model/requests/request-casa-simple.model';
import { MunicipioResponse } from 'src/app/shared/model/responses/municipio-response.model';
import { ProvinciaResponse } from 'src/app/shared/model/responses/provincia-response.model';
import { FiltroService } from 'src/app/shared/services/filtro.service';
import { CasaResponse } from 'src/app/shared/model/responses/casa-response.model';
import { TranslateService } from '@ngx-translate/core';
import { ClienteService } from 'src/app/shared/services/cliente.service';
import { SafeResourceUrl } from '@angular/platform-browser';
import { BloqueadoService } from 'src/app/shared/services/bloqueado.service';
import { RequestBloqueado } from 'src/app/shared/model/requests/request-bloqueado.model';
import { Modal } from 'bootstrap';
import { ReporteService } from 'src/app/shared/services/reporte.service';

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
  buscaUsuFormu: FormGroup;
  listaUsuarios: SelectItem[] = [];
  usuarioSelect: any;
  usuarioSeleccionado: any;
  ruta: SafeResourceUrl;
  blockForm: FormGroup;
  men: any;
  isbloqueado: boolean = false;
  numReportes:number;

  constructor(
    private formubuild: FormBuilder,
    private provinciaService: ProvinciaService,
    private municipioService: MunicipioService,
    private filtroService: FiltroService,
    private router: Router,
    private translate: TranslateService,
    private servicioCliente: ClienteService,
    private bloqueoService: BloqueadoService,
    private messageService: MessageService,
    private primengConfig: PrimeNGConfig,
    private reporteService:ReporteService
  ) {
    this.buscaFormu = this.formubuild.group({
      provinciasS: [0],
      fechas: [null, [Validators.required]],
      pueblos: [0],
      nInquilinos: [],
      nHabitaciones: [],
    });

    this.blockForm = this.formubuild.group({
      motivo: [],
    });

    this.buscaUsuFormu = this.formubuild.group({
      usuarioSelect: [null],
    });

    this.translate.setDefaultLang('es');
  }

  ngOnInit(): void {
    this.datosUsu = JSON.parse(sessionStorage.getItem('datosUsu'));

    this.primengConfig.ripple = true;

    if (this.datosUsu?.administrador) {
      this.servicioCliente.getListaCliente().subscribe((lista) => {
        // Filtrar y mapear correctamente los usuarios
        const usuariosConDatos = lista
          .filter((element) => element.gmail !== 'admin@admin.com') // Filtrar usuarios válidos
          .map((element) => {
            return { label: element.gmail, value: element };
          },
          (error) => {
            console.error('Error al obtener la lista de clientes:', error);
          });

        this.listaUsuarios = usuariosConDatos;



        // Suscribirse a los cambios del control `usuarioSelect`
        this.buscaUsuFormu
          .get('usuarioSelect')
          ?.valueChanges.subscribe((value) => {
            if (value) {
              // Verificar que value no sea undefined
              this.usuarioSeleccionado = value;

              console.log(this.usuarioSeleccionado);

              this.bloqueoService.consultaBloqueo(this.usuarioSeleccionado.gmail).subscribe((bloq)=>{
                this.isbloqueado=bloq;
              });

              this.reporteService.numeroReportes(this.usuarioSeleccionado.gmail).subscribe((nRepor)=>{
                this.numReportes=nRepor;
              });

              // Evitar que la propiedad `gmail` sea undefined
              if (this.usuarioSeleccionado && this.usuarioSeleccionado.gmail) {
                this.servicioCliente
                  .getRutaFotoPerfil(this.usuarioSeleccionado.gmail)
                  .subscribe((rut) => {
                    this.ruta = rut.urlImg;
                  });
              }
            }
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

  //----------------------------------------------------------------------
  convertStringToDateCET(dateInput: any): Date | null {
    // Si el valor ya es un objeto Date, lo retornamos ajustado a CET
    if (dateInput instanceof Date) {
      return this.adjustToCET(dateInput);
    }

    // Si el valor es una cadena en formato yyyy-MM-dd
    if (
      typeof dateInput === 'string' &&
      /^\d{4}-\d{2}-\d{2}$/.test(dateInput)
    ) {
      const [year, month, day] = dateInput.split('-').map(Number);

      // Crear una fecha en UTC
      const utcDate = new Date(Date.UTC(year, month - 1, day, 0, 0, 0, 0));

      // Ajustar la fecha a CET y devolverla como Date
      return this.adjustToCET(utcDate);
    }

    // Si el valor es una cadena en formato ISO (como '2024-12-26T23:00:00.000+00:00')
    if (typeof dateInput === 'string' && !isNaN(Date.parse(dateInput))) {
      // Convertir la cadena ISO a un objeto Date
      const isoDate = new Date(dateInput);

      // Ajustar la fecha a CET y devolverla como Date
      return this.adjustToCET(isoDate);
    }

    console.error(
      'El valor proporcionado no es una cadena en formato válido ni un objeto Date:',
      dateInput
    );
    return null;
  }

  adjustToCET(utcDate: Date): Date {
    // CET es UTC + 1, ajustamos la fecha
    const cetOffset = 1 * 60; // 1 hora (en minutos)

    // Ajuste para horario de verano (CEST es UTC+2)
    const isDST = this.isDaylightSavingTime(utcDate);
    const offset = isDST ? 2 * 60 : cetOffset; // 2 horas en verano (CEST)

    // Ajustamos la fecha añadiendo el offset de CET/CEST
    const adjustedDate = new Date(utcDate.getTime() + offset * 60000); // Convertimos minutos a milisegundos

    return adjustedDate;
  }

  isDaylightSavingTime(date: Date): boolean {
    // Verifica si la fecha está dentro del horario de verano (CEST)
    const jan = new Date(date.getFullYear(), 0, 1).getTimezoneOffset();
    const jul = new Date(date.getFullYear(), 6, 1).getTimezoneOffset();
    return Math.max(jan, jul) !== date.getTimezoneOffset();
  }

  //--------------------------------------------------------------------------

  formatDateToCET(dateInput: string): string {
    const date = this.convertStringToDateCET(dateInput); // Convierte a una fecha ajustada a CET
    if (date) {
      // Formatear la fecha a 'yyyy-MM-dd'
      return date.toISOString().slice(0, 10);
    }
    return ''; // Retorna una cadena vacía si no se puede convertir
  }

  bloquearUsu(usu: any) {
    this.men = '';

    let request: RequestBloqueado = {
      gmailBloqueado: usu.gmail,
      motivo: this.blockForm.value.motivo,
    };

    this.bloqueoService.crearBloqueo(request).subscribe((info) => {
      this.men = 'Usuario Bloqueado con éxito';
      this.isbloqueado = true;
      this.messageService.add({
        severity: 'info',
        summary: 'Operación con éxito',
        detail: this.men
      });

      // Simula un clic en el botón de cerrar del modal
      const closeButton = document.querySelector('#blockModal .btn-close') as HTMLElement;
      if (closeButton) {
        closeButton.click();
      }
    });
  }

  desbloquearUsu(usu: any) {
    this.bloqueoService.elimnarBloqueo(usu.gmail).subscribe(
      () => {
        this.isbloqueado = false;
        this.men = 'Usuario desbloqueado con éxito';
        this.messageService.add({
          severity: 'success',
          summary: 'Operación con éxito',
          detail: this.men
        });
      },
      (error) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error al desbloquear',
          detail: 'No se pudo desbloquear al usuario'
        });
        console.error(error)
      }
    );
  }



}
