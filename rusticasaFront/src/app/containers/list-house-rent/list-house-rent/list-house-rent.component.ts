import { Component, OnInit } from '@angular/core';
import { CasaService } from 'src/app/shared/services/casa.service';

@Component({
  selector: 'app-list-house-rent',
  templateUrl: './list-house-rent.component.html',
  styleUrls: ['./list-house-rent.component.scss']
})
export class ListHouseRentComponent implements OnInit {
  casasPaginadas: any[] = [];
  currentPage: number = 0; // Página actual
  rows: number = 10; // Número de filas por página
  totalRecords: number = 0; // Total de registros
  usuConn: any;

  constructor(private casaService:CasaService) { }

  ngOnInit(): void {
    this.usuConn = JSON.parse(sessionStorage.getItem('datosUsu'));
    this.loadCasas(this.currentPage);
  }

  loadCasas(page: number) {
    this.casaService.getListaCasaAlquilado(this.usuConn.gmail).subscribe({
      next: (response: any) => {
        console.info(response)
        // this.casasPaginadas = response.content;
        // this.totalRecords = response.totalElements; // Ajusta según la respuesta del backend
        // console.log(this.casasPaginadas)
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

}
