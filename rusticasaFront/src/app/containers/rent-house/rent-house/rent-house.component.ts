import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CasaResponse } from 'src/app/shared/model/responses/casa-response.model';
import { BreadcrumbService } from 'src/app/shared/services/breadcrumb.service';
import { CasaService } from 'src/app/shared/services/casa.service';
import { MenuItem } from 'primeng/api';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RequestAlquilaCasa } from 'src/app/shared/model/requests/request-alquilar-casa.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-rent-house',
  templateUrl: './rent-house.component.html',
  styleUrls: ['./rent-house.component.scss'],
})
export class RentHouseComponent implements OnInit {
  casa: CasaResponse;
  idCasaString: string;
  idCasaLong: number;
  usuConn: any;
  alquilaForm: FormGroup;
  alquilaForm2: FormGroup;
  ccRegex: RegExp = /^[0-9\-]+$/;
  activeIndex: number = 0;
  items: MenuItem[] = [];
  isFormSubmitted: boolean = false;
  usuarioLog: any;
  casasOcupadas: number[] = [];
  errorMessage:any;

  constructor(
    private route: ActivatedRoute,
    private breadcrumbService: BreadcrumbService,
    private casaService: CasaService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {
    this.alquilaForm = this.formBuilder.group({
      fechas: [null, [Validators.required]],
    });

    this.alquilaForm2 = this.formBuilder.group({
      inputDatosTarjeta: ['', [Validators.required, Validators.pattern(this.ccRegex)]],
      cvv: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(3)]],
      direccion: ['', [Validators.required]]
    });
  }

  ngOnInit(): void {
    this.usuarioLog = JSON.parse(sessionStorage.getItem('datosUsu'));

    this.items = [
      { label: 'Fecha Alquiler' },
      { label: 'Datos Tarjeta' }
    ];

    this.idCasaString = this.route.snapshot.paramMap.get('idCasa');
    this.idCasaLong = this.idCasaString ? parseInt(this.idCasaString, 10) : null;

    if (this.idCasaLong) {
      this.breadcrumbService.updateBreadcrumbs([
        { label: 'Inicio', routerLink: '/welcome' },
        { label: 'Búsquedas', routerLink: '/full-search' },
        {
          label: 'Detalles Casa',
          routerLink: `/details-house/${this.idCasaLong}`,
        },
        {
          label: 'Alquila Casa',
          routerLink: `/rent-house/${this.idCasaLong}`,
        },
      ]);
    }

    this.casaService.getDatosCasaIdCasa(this.idCasaLong).subscribe({
      next: (casaR) => {
        this.casa = casaR;
        console.log(this.casa);
      },
      error: (err) => {
        console.error(err);
      },
    });
  }

  nextStep(): void {
    this.errorMessage = ''; // Limpiar el mensaje de error al iniciar
    if (this.alquilaForm.valid) {
      this.checkAvailability(this.alquilaForm.value.fechas).subscribe({
        next: (casasOcupadas) => {
          this.casasOcupadas = casasOcupadas;
          if (!this.casasOcupadas.includes(this.idCasaLong)) {
            if (this.activeIndex < this.items.length - 1) {
              this.activeIndex++;
            }
          } else {
            // Establecer el mensaje de error en lugar de alert
            this.errorMessage = 'La casa ya está alquilada en estas fechas.';
          }
        },
        error: (err) => {
          console.error(err);
        }
      });
    } else {
      this.isFormSubmitted = true; // Marcar el formulario como enviado para mostrar errores
    }
  }

  checkAvailability(fechas: Date[]): Observable<number[]> {
    const fechaEntrada = new Date(fechas[0]);
    const fechaSalida = new Date(fechas[1]);
    return this.casaService.getCasasByFechas(fechaEntrada, fechaSalida);
  }

  previousStep(): void {
    if (this.activeIndex > 0) {
      this.activeIndex--;
    }
  }

  rentHouse() {
    // Ajustar las fechas a CET/CEST antes de enviarlas al backend
    const fechaEntradaAjustada = this.convertStringToDateCET(this.alquilaForm.value.fechas[0]);
    const fechaSalidaAjustada = this.convertStringToDateCET(this.alquilaForm.value.fechas[1]);

    if (fechaEntradaAjustada && fechaSalidaAjustada) {
      let casaAlquilada: RequestAlquilaCasa = {
        gmail: this.usuarioLog.gmail,
        idCasa: this.idCasaLong,
        fechaEntrada: fechaEntradaAjustada, // Usar la fecha ajustada
        fechaSalida: fechaSalidaAjustada    // Usar la fecha ajustada
      };

      this.casaService.alquilaCasa(casaAlquilada).subscribe({
        next: (inf) => {},
        error: (err) => {
          console.error(err);
        },
        complete: () => {
          console.info("Casa Alquilada Correctamente");
          this.router.navigate(['/list-house-rent']);
        }
      });
    } else {
      console.error('Las fechas no se han podido ajustar correctamente.');
    }
  }


  formatDateToYYYYMMDD(date: Date): string {
    const year = date.getFullYear();
    const month = ('0' + (date.getMonth() + 1)).slice(-2);
    const day = ('0' + date.getDate()).slice(-2);
    return `${year}-${month}-${day}`;
  }

   //----------------------------------------------------------------------
   convertStringToDateCET(dateInput: any): Date | null {
    // Si el valor ya es un objeto Date, lo retornamos
    if (dateInput instanceof Date) {
      return this.adjustToCET(dateInput);
    }

    // Si el valor es una cadena, intentamos convertirla a una fecha y luego ajustar a CET
    if (typeof dateInput === 'string') {
      const [day, month, year] = dateInput.split('/').map(Number);

      // Crear una fecha en UTC
      const utcDate = new Date(Date.UTC(year, month - 1, day, 0, 0, 0, 0));

      // Ajustar la fecha a CET y devolverla como Date
      return this.adjustToCET(utcDate);
    }

    console.error('El valor proporcionado no es una cadena ni un objeto Date:', dateInput);
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

}
