import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CasaService } from 'src/app/shared/services/casa.service';

import * as pdfMake from 'pdfmake/build/pdfmake';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';

pdfMake.vfs = pdfFonts.pdfMake.vfs;

@Component({
  selector: 'app-list-house-rent',
  templateUrl: './list-house-rent.component.html',
  styleUrls: ['./list-house-rent.component.scss'],
})
export class ListHouseRentComponent implements OnInit {
  casasPaginadas: any[] = [];
  currentPage: number = 0; // Página actual
  rows: number = 10; // Número de filas por página
  totalRecords: number = 0; // Total de registros
  usuConn: any;

  constructor(private casaService: CasaService, private router: Router) {}

  ngOnInit(): void {
    this.usuConn = JSON.parse(sessionStorage.getItem('datosUsu'));
    this.loadCasas(this.currentPage);
  }

  loadCasas(page: number) {
    this.casaService.getListaCasaAlquilado(this.usuConn.gmail).subscribe({
      next: (response: any) => {
        this.casasPaginadas = response.content;
        this.totalRecords = response.totalElements; // Ajusta según la respuesta del backend
        console.log(this.casasPaginadas);
      },
      error: (err) => {
        console.error(err);
      },
      complete: () => {
        console.info('Lista de casas cargada correctamente');
      },
    });
  }

  onPageChange(event: any) {
    this.currentPage = event.page;
    this.loadCasas(this.currentPage);
  }

  goBuscar() {
    this.router.navigate(['/full-search']);
  }

  eliminarAlquiler(gmail: string, idCasa: number, fechaEntrada: string): void {
    // Convertir la fecha a un objeto Date ajustado a CET/CEST
    const fechaAjustada = this.convertStringToDateCET(fechaEntrada);

    if (!fechaAjustada) {
      console.error(
        'El formato de la fecha es incorrecto o no se pudo convertir'
      );
      return;
    }

    this.casaService.eliminarAlquiler(gmail, idCasa, fechaAjustada).subscribe({
      next: () => {
        console.log('Alquiler eliminado con éxito');
        this.loadCasas(this.currentPage); // Recargar la lista de casas
      },
      error: (err) => {
        console.error('Error al eliminar el alquiler', err);
      },
    });
  }

  formatearFecha(fechaISO: string): string {
    const fecha = new Date(fechaISO); // Parsear la cadena ISO a un objeto Date
    const fechaFormateada = fecha.toISOString().slice(0, 10); // Extraer los primeros 10 caracteres que representan yyyy-MM-dd
    return fechaFormateada;
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

  generarPdf(casa: any) {
    const documentDefinition = {
      content: [
        { text: 'Detalles de la Casa Alquilada', style: 'header' },
        { text: `Nombre de la Casa: ${casa.nombreCasa}`, style: 'subheader' },
        { text: `Descripción: ${casa.descripcion}`, style: 'normal' },
        { text: `Fecha de Entrada: ${this.formatDateToCET(casa.fechaEntrada)}`, style: 'normal' },
        { text: `Fecha de Salida: ${this.formatDateToCET(casa.fechaSalida)}`, style: 'normal' },
        { text: `Número de Habitaciones: ${casa.numeroHabitaciones}`, style: 'normal' },
        { text: `Número de Inquilinos: ${casa.numeroInquilinos}`, style: 'normal' },
        { text: `Precio por Noche: $${casa.precioNoche}`, style: 'normal' },
        { text: `Municipio: ${casa.municipio}`, style: 'normal' },
      ],
      styles: {
        header: {
          fontSize: 22,
          bold: true,
          margin: [0, 0, 0, 10],
        },
        subheader: {
          fontSize: 18,
          bold: true,
          margin: [0, 10, 0, 5],
        },
        normal: {
          fontSize: 12,
          margin: [0, 0, 0, 5],
        },
      },
    };

    pdfMake.createPdf(documentDefinition).download(`${casa.nombreCasa}_detalles.pdf`);
  }

}
