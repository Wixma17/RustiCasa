import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CasaService } from 'src/app/shared/services/casa.service';

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
    // Verificar que la fecha tenga un formato correcto
    let fechaFormateada=this.formatearFecha(fechaEntrada);
    if (!/^\d{4}-\d{2}-\d{2}$/.test(fechaFormateada)) {
      console.error('El formato de la fecha es incorrecto');
      return;
    }

    // Convertir la cadena de texto a un objeto Date
    const fecha = new Date(fechaFormateada);

    console.log(fecha)

    this.casaService.eliminarAlquiler(gmail, idCasa, fecha)
      .subscribe({
        next: () => {
          console.log('Alquiler eliminado con éxito');
          // Recargar la lista de casas para reflejar el cambio
          this.loadCasas(this.currentPage);
        },
        error: (err) => {
          console.error('Error al eliminar el alquiler', err);
        }
      });
  }

  formatearFecha(fechaISO: string): string {
    const fecha = new Date(fechaISO);  // Parsear la cadena ISO a un objeto Date
    const fechaFormateada = fecha.toISOString().slice(0, 10);  // Extraer los primeros 10 caracteres que representan yyyy-MM-dd
    return fechaFormateada;
  }
}
