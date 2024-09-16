import { Component, OnInit } from '@angular/core';
import { CasaService } from 'src/app/shared/services/casa.service';

@Component({
  selector: 'app-list-house-owner',
  templateUrl: './list-house-owner.component.html',
  styleUrls: ['./list-house-owner.component.scss'],
})
export class ListHouseOwnerComponent implements OnInit {
  casasPaginadas: any[] = [];
  currentPage: number = 0; // Página actual
  rows: number = 10; // Número de filas por página
  totalRecords: number = 0; // Total de registros
  usuConn: any;

  constructor(private casaService: CasaService) {}

  ngOnInit(): void {
    this.usuConn = JSON.parse(sessionStorage.getItem('datosUsu'));
    this.loadCasas(this.currentPage);
  }

  loadCasas(page: number) {
    this.casaService.getListaCasasPorGmail(this.usuConn.gmail).subscribe({
      next: (response: any) => {
        this.casasPaginadas = response.content;
        this.totalRecords = response.totalElements; // Ajusta según la respuesta del backend
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
