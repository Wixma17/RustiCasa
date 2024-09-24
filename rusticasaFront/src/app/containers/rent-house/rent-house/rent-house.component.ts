import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CasaResponse } from 'src/app/shared/model/responses/casa-response.model';
import { BreadcrumbService } from 'src/app/shared/services/breadcrumb.service';
import { CasaService } from 'src/app/shared/services/casa.service';
import { MenuItem } from 'primeng/api';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RequestAlquilaCasa } from 'src/app/shared/model/requests/request-alquilar-casa.model';

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

  constructor(
    private route: ActivatedRoute,
    private breadcrumbService: BreadcrumbService,
    private casaService: CasaService,
    private formBuilder: FormBuilder
  ) {
    this.alquilaForm = this.formBuilder.group({
      fechas: [null, [Validators.required]],
    });

    this.alquilaForm2 = this.formBuilder.group({
      inputDatosTarjeta:['',[Validators.required, Validators.pattern(this.ccRegex)]],
      cvv:['',[Validators.required,Validators.minLength(3),Validators.maxLength(3)]],
      direccion:['',[Validators.required]]
    });
  }

  ngOnInit(): void {

    this.usuarioLog = JSON.parse(sessionStorage.getItem('datosUsu'));

    this.items = [
      { label: 'Fecha Alquiler' },
      { label: 'Datos Tarjeta' }
    ];

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
      },
    });
  }

  nextStep(): void {
    if (this.alquilaForm.valid) {
      if (this.activeIndex < this.items.length - 1) {
        this.activeIndex++;
      }
    } else {
      this.isFormSubmitted = true; // Marcar el formulario como enviado para mostrar errores
    }
  }

  previousStep(): void {
    if (this.activeIndex > 0) {
      this.activeIndex--;
    }
  }

  rentHouse(){
    let casaAlquilada:RequestAlquilaCasa={
      gmail: this.usuarioLog.gmail,
      idCasa: this.idCasaLong,
      fechaEntrada: this.alquilaForm.value.fechas[0],
      fechaSalida: this.alquilaForm.value.fechas[1]
    }

    this.casaService.alquilaCasa(casaAlquilada).subscribe({
      next:(inf)=>{

      },
      error:(err)=>{
        console.error(err)
      },
      complete:()=>{
        console.info("Casa Alquilada Correctamente");
      }
    });

  }

}
