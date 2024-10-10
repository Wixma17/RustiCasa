import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService, PrimeNGConfig } from 'primeng/api';
import { CasaService } from 'src/app/shared/services/casa.service';
import { ClienteService } from 'src/app/shared/services/cliente.service';

@Component({
  selector: 'app-house-request',
  templateUrl: './house-request.component.html',
  styleUrls: ['./house-request.component.scss'],
})
export class HouseRequestComponent implements OnInit {
  casasPaginadas: any[] = [];
  currentPage: number = 0; // Página actual
  rows: number = 10; // Número de filas por página
  totalRecords: number = 0; // Total de registros
  usuConn: { gmail: string } | null = null; // Almacena la conexión del usuario
  datosUsuSolicitante: { [key: string]: any } = {}; // Almacena los datos de los usuarios por correo

  constructor(
    private casaService: CasaService,
    private router: Router,
    private messageService: MessageService,
    private primengConfig: PrimeNGConfig,
    private clienteService: ClienteService
  ) {}

  ngOnInit(): void {
    this.usuConn = JSON.parse(sessionStorage.getItem('datosUsu') || 'null');
    this.loadCasas(this.currentPage);
    this.primengConfig.ripple = true;
  }

  loadCasas(page: number): void {
    if (!this.usuConn) return; // Asegurarse de que usuConn no sea nulo
    this.casaService
      .getInfoCasasPorEmailPropietario(this.usuConn.gmail, page, this.rows)
      .subscribe({
        next: (response: any) => {
          this.casasPaginadas = response.content;
          this.totalRecords = response.totalItems; // Ajusta según la respuesta del backend
          this.cargarDatosClientes();
        },
        error: (err) => {
          console.error('Error al cargar casas:', err);
        },
        complete: () => {
          console.info('Lista de casas cargada correctamente');
        },
      });
  }

  cargarDatosClientes(): void {
    this.casasPaginadas.forEach((element) => {
      this.clienteService
        .getDataCliente(element.alquilaEntityPK.gmail)
        .subscribe(
          (datos) => {
            this.datosUsuSolicitante[element.alquilaEntityPK.gmail] = datos;
          },
          (error) => {
            console.error(
              `Error al obtener datos del cliente ${element.gmail}:`,
              error
            );
          }
        );
    });
  }

  onPageChange(event: any): void {
    this.currentPage = event.page;
    this.loadCasas(this.currentPage);
  }

  aceptaSolicitud(idCasa: number, gmailInteresado: string): void {
    this.casaService.updateEstadoCasa(idCasa, 'A').subscribe(
      () => {
        this.messageService.add({
          severity: 'success',
          summary: 'Operación con éxito',
          detail: 'Petición Aceptada con éxito',
        });
      },
      (error) => {
        console.error('Error al aceptar solicitud:', error);
      }
    );
  }

  eliminaSolicitud(idCasa: number, gmailInteresado: string): void {
    this.casaService.updateEstadoCasa(idCasa, 'C').subscribe(
      () => {
        this.messageService.add({
          severity: 'success',
          summary: 'Operación con éxito',
          detail: 'Petición Rechazada con éxito',
        });
      },
      (error) => {
        console.error('Error al eliminar solicitud:', error);
      }
    );
  }

  revisionSolicitud(idCasa: number, gmailInteresado: string): void {
    this.casaService.updateEstadoCasa(idCasa, 'P').subscribe(
      () => {
        this.messageService.add({
          severity: 'success',
          summary: 'Operación con éxito',
          detail: 'Petición en revisión con éxito',
        });
      },
      (error) => {
        console.error('Error al revisar solicitud:', error);
      }
    );
  }

  formatDateToCET(dateInput: string): string {
    const date = this.convertStringToDateCET(dateInput); // Convierte a una fecha ajustada a CET
    return date ? date.toISOString().slice(0, 10) : ''; // Retorna la fecha formateada o cadena vacía
  }

  formatDateToYYYYMMDD(date: Date): string {
    const year = date.getFullYear();
    const month = ('0' + (date.getMonth() + 1)).slice(-2);
    const day = ('0' + date.getDate()).slice(-2);
    return `${year}-${month}-${day}`;
  }

  convertStringToDateCET(dateInput: any): Date | null {
    if (dateInput instanceof Date) {
      return this.adjustToCET(dateInput);
    }

    if (typeof dateInput === 'string') {
      // Intenta crear una fecha directamente desde la cadena
      const date = new Date(dateInput);
      if (isNaN(date.getTime())) {
        console.error('Fecha inválida:', dateInput);
        return null; // Devuelve null si la fecha es inválida
      }
      return this.adjustToCET(date);
    }

    console.error(
      'El valor proporcionado no es una cadena ni un objeto Date:',
      dateInput
    );
    return null;
  }

  adjustToCET(utcDate: Date): Date {
    const cetOffset = 1 * 60; // 1 hora (en minutos)
    const isDST = this.isDaylightSavingTime(utcDate);
    const offset = isDST ? 2 * 60 : cetOffset; // 2 horas en verano (CEST)
    const adjustedDate = new Date(utcDate.getTime() + offset * 60000); // Convertimos minutos a milisegundos
    return adjustedDate;
  }

  isDaylightSavingTime(date: Date): boolean {
    const jan = new Date(date.getFullYear(), 0, 1).getTimezoneOffset();
    const jul = new Date(date.getFullYear(), 6, 1).getTimezoneOffset();
    return Math.max(jan, jul) !== date.getTimezoneOffset();
  }
}
