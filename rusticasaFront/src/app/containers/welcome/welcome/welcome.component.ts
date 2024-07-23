import { CasaService } from 'src/app/shared/services/casa.service';
import { Component, OnInit } from '@angular/core';
import { CasaResponse } from 'src/app/shared/model/responses/casa-response.model';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss']
})
export class WelcomeComponent implements OnInit {

  constructor(private casaServicio:CasaService) { }

  listaCasaGenerica:CasaResponse[];

  ngOnInit(): void {
    this.casaServicio.getListaCasas().subscribe(
      {
        next:(casa)=> {
          this.listaCasaGenerica=casa;
        }
      }
    );
  }

}
