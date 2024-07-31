import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BusquedasService } from 'src/app/shared/services/busquedas.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  nombreCasa:string ='';


  constructor(private busqueda:BusquedasService,private router:Router) { }

  ngOnInit(): void {
  }

  buscarCasa(): void {
    console.log(this.busqueda.buscar(this.nombreCasa));

  }

}
