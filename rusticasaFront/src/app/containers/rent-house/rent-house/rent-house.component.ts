import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CasaResponse } from 'src/app/shared/model/responses/casa-response.model';
import { BreadcrumbService } from 'src/app/shared/services/breadcrumb.service';
import { CasaService } from 'src/app/shared/services/casa.service';

@Component({
  selector: 'app-rent-house',
  templateUrl: './rent-house.component.html',
  styleUrls: ['./rent-house.component.scss']
})
export class RentHouseComponent implements OnInit {
  casa: CasaResponse;
  idCasaString: string;
  idCasaLong: number;
  usuConn: any;

  constructor( private route: ActivatedRoute,private breadcrumbService: BreadcrumbService,
    private casaService: CasaService
  ) { }

  ngOnInit(): void {
    this.idCasaString = this.route.snapshot.paramMap.get('idCasa');
    this.idCasaLong = this.idCasaString
      ? parseInt(this.idCasaString, 10)
      : null;

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
      }
    });
  }

}
