import { Component, ElementRef, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { RequestOpinion } from 'src/app/shared/model/requests/request-opina.model';
import { CasaResponse } from 'src/app/shared/model/responses/casa-response.model';
import { OpinionResponse } from 'src/app/shared/model/responses/opinion-response.model';
import { BreadcrumbService } from 'src/app/shared/services/breadcrumb.service';
import { CasaService } from 'src/app/shared/services/casa.service';
import { ClienteService } from 'src/app/shared/services/cliente.service';

@Component({
  selector: 'app-opinion-list-house',
  templateUrl: './opinion-list-house.component.html',
  styleUrls: ['./opinion-list-house.component.scss'],
})
export class OpinionListHouseComponent implements OnInit {
  casa: CasaResponse;
  idCasaString: string;
  idCasaLong: number;
  listaOpinion: any = [];
  rutasFotosPerfil: { [gmail: string]: string } = {};
  nombreClientes: { [gmail: string]: string } = {};
  subeOpinionForm: FormGroup;
  isDisabled: boolean = false;
  usuConn: any;

  // Variables de paginación
  page: number = 0; // Página actual
  rows: number = 10; // Tamaño de la página
  totalRecords: number = 0; // Total de registros

  constructor(
    private route: ActivatedRoute,
    private serviceHouse: CasaService,
    private breadcrumbService: BreadcrumbService,
    private casaService: CasaService,
    private clienteService: ClienteService,
    private formubuild: FormBuilder,
  ) {
    this.subeOpinionForm = this.formubuild.group({
      nEstrellas: [0],
      textoOpi: ['', [Validators.required, Validators.minLength(10)]],
    });
  }

  ngOnInit(): void {
    this.usuConn = JSON.parse(sessionStorage.getItem('datosUsu'));

    this.idCasaString = this.route.snapshot.paramMap.get('idCasa');
    this.idCasaLong = this.idCasaString
      ? parseInt(this.idCasaString, 10)
      : null;

    this.casaService
      .getListaCasasPorGmail(this.usuConn.gmail)
      .subscribe((casas) => {
        casas.content.forEach((element) => {
          if (element.idCasa == this.idCasaLong) {
            this.isDisabled = true;
          }
        });
      });

    if (this.idCasaLong) {
      // Actualiza los breadcrumbs manualmente si es necesario
      this.breadcrumbService.updateBreadcrumbs([
        { label: 'Inicio', routerLink: '/welcome' },
        { label: 'Búsquedas', routerLink: '/full-search' },
        {
          label: 'Detalles Casa',
          routerLink: `/details-house/${this.idCasaLong}`,
        },
        {
          label: 'Opinion Casa',
          routerLink: `/opinion-list-house/${this.idCasaLong}`,
        },
      ]);
    }

    this.serviceHouse.getDatosCasaIdCasa(this.idCasaLong).subscribe({
      next: (casaR) => {
        this.casa = casaR;
        console.log(this.casa);
      },
      error: (err) => {
        console.error(err);
      },
      complete: () => {
        this.loadOpinions(); // Cargar las opiniones cuando los datos de la casa estén listos
      },
    });
  }

  // Método para cargar las opiniones con paginación
  loadOpinions(): void {
    this.casaService
      .getListaOpinionCasaPage(this.idCasaLong, this.page, this.rows)
      .subscribe({
        next: (page) => {
          this.listaOpinion = page.content; // Extraer la lista de opiniones paginadas
          this.totalRecords = page.totalElements; // Establecer el total de registros para el paginador

          // Obtener la foto de perfil para cada opinión
          this.listaOpinion.forEach((op) => {
            this.clienteService
              .getRutaFotoPerfil(op.opinaEntityPK.gmail)
              .subscribe(
                (ruta) => {
                  this.rutasFotosPerfil[op.opinaEntityPK.gmail] = ruta;
                },
                (error) => {
                  console.error(
                    'Error al obtener la ruta de la foto de perfil:',
                    error
                  );
                }
              );
          });

          // Obtener el nombre del cliente para cada opinión
          this.listaOpinion.forEach((op) => {
            this.clienteService
              .getDataCliente(op.opinaEntityPK.gmail)
              .subscribe(
                (nombre) => {
                  this.nombreClientes[op.opinaEntityPK.gmail] = nombre;
                },
                (error) => {
                  console.error(
                    'Error al obtener el nombre del cliente:',
                    error
                  );
                }
              );
          });

          console.log(`Total de páginas: ${page.totalPages}`);
          console.log(`Total de elementos: ${page.totalElements}`);
        },
        error: (err) => {
          console.error(err);
        },
        complete: () => {
          console.log(this.listaOpinion);
        },
      });
  }

  // Método que se llama cuando cambia la página en el paginador
  onPageChange(event: any): void {
    this.page = event.page; // Actualizar la página actual
    this.rows = event.rows; // Actualizar el tamaño de la página
    this.loadOpinions(); // Recargar las opiniones con la nueva página
  }

  subirOpi() {
    let opinion: RequestOpinion = {
      gmail: this.usuConn.gmail,
      idCasa: this.idCasaLong,
      textoOpinion: this.subeOpinionForm.value.textoOpi,
      puntuacion: this.subeOpinionForm.value.nEstrellas,
    };

    this.casaService.publicaOpi(opinion).subscribe({
      next:(s)=>{
      console.info("Opinion subida con exito")
      },
      error:(err)=>{
        console.error(err)
      },
      complete:()=>{
        window.location.reload();
      }
    })
  }
}
