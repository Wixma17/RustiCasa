import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService, PrimeNGConfig } from 'primeng/api';
import { CasaService } from 'src/app/shared/services/casa.service';

@Component({
  selector: 'app-house-request',
  templateUrl: './house-request.component.html',
  styleUrls: ['./house-request.component.scss']
})
export class HouseRequestComponent implements OnInit {
  casasPaginadas: any[] = [];
  currentPage: number = 0; // Página actual
  rows: number = 10; // Número de filas por página
  totalRecords: number = 0; // Total de registros
  usuConn: any;

  constructor(private casaService: CasaService,private router: Router,private messageService: MessageService,private primengConfig: PrimeNGConfig) {}

  ngOnInit(): void {
    this.usuConn = JSON.parse(sessionStorage.getItem('datosUsu'));
    this.loadCasas(this.currentPage);
    this.primengConfig.ripple = true;
  }

  loadCasas(page: number) {
    this.casaService.getListaCasasPorGmail(this.usuConn.gmail).subscribe({
      next: (response: any) => {
        this.casasPaginadas = response.content;
        this.totalRecords = response.totalElements; // Ajusta según la respuesta del backend
        console.log(this.casasPaginadas)
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

  aceptaSolicitud(idCasa){
    this.casaService.updateEstadoCasa(idCasa,"A").subscribe((i)=>{
      this.messageService.add({
        severity: 'success',
        summary: 'Operación con éxito',
        detail: "Petición Aceptada con éxito"
      });
    });
  }

  eliminaSolicitud(idCasa){
    this.casaService.updateEstadoCasa(idCasa,"C").subscribe((i)=>{
      this.messageService.add({
        severity: 'success',
        summary: 'Operación con éxito',
        detail: "Petición Rechazada con éxito"
      });
    });
  }

  revisionSolicitud(idCasa){
    this.casaService.updateEstadoCasa(idCasa,"P").subscribe((i)=>{
      this.messageService.add({
        severity: 'success',
        summary: 'Operación con éxito',
        detail: "Petición Rechazada con éxito"
      });
    });
  }

}
