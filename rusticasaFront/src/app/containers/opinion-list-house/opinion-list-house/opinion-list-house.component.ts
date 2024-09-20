import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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
  idCasaString:string;
  idCasaLong:number;
  listaOpinion:any;
  rutasFotosPerfil: { [gmail: string]: string } = {};
  nombreClientes: { [gmail: string]: string } = {};

  constructor(
    private route: ActivatedRoute,
    private serviceHouse: CasaService,
    private breadcrumbService:BreadcrumbService,
    private casaService:CasaService,
    private clienteService:ClienteService
  ) {}

  ngOnInit(): void {
    this.idCasaString = this.route.snapshot.paramMap.get('idCasa');
    this.idCasaLong = this.idCasaString ? parseInt(this.idCasaString, 10) : null;

    if (this.idCasaLong) {
      // Actualiza los breadcrumbs manualmente si es necesario
      this.breadcrumbService.updateBreadcrumbs([
        { label: 'Inicio', routerLink: '/welcome' },
        { label: 'Búsquedas', routerLink: '/full-search' },
        { label: 'Detalles Casa', routerLink: `/details-house/${this.idCasaLong}` },
        { label: 'Opinion Casa', routerLink: `/opinion-list-house/${this.idCasaLong}` }
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
        console.info('Datos cargados de la casa correctamente');

        this.casaService.getListaOpinionCasa(this.idCasaLong).subscribe({
          next:(listaOp)=>{
            this.listaOpinion=listaOp;

            this.listaOpinion.forEach(op => {
              this.clienteService.getRutaFotoPerfil(op.opinaEntityPK.gmail).subscribe(
                (ruta) => {
                  this.rutasFotosPerfil[op.opinaEntityPK.gmail] = ruta;
                  console.log(this.rutasFotosPerfil)
                },
                (error) => {
                  console.error('Error al obtener la ruta de la foto de perfil:', error);
                }
              );
            });

            this.listaOpinion.forEach(op => {
              this.clienteService.getDataCliente(op.opinaEntityPK.gmail).subscribe(
                (nombre) => {
                  this.nombreClientes[op.opinaEntityPK.gmail] = nombre;
                  console.log(this.nombreClientes)
                },
                (error) => {
                  console.error('Error al obtener el nombre del cliente:', error);
                }
              );
            });

          },
          error:(err)=>{
            console.error(err);
          },
          complete:()=>{
            console.log(this.listaOpinion);
          }
        });
      },
    });
  }




}
