import { Component, OnInit } from '@angular/core';
import { CasaResponse } from 'src/app/shared/model/responses/casa-response.model';
import { CasaService } from 'src/app/shared/services/casa.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  nombreCasa:string ='';
  resultados: CasaResponse[] = [];

  constructor(private casaS:CasaService) { }

  ngOnInit(): void {
  }

  buscar(): void {

    this.casaS.getListaCasasPorNombre(this.nombreCasa).subscribe({
      next:(casa)=>{
          console.log(casa)
      }
    });

  }

}
