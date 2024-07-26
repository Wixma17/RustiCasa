import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  nombreCasa:string ='';
  resultados: string[] = [];

  constructor() { }

  ngOnInit(): void {
  }

  buscar(): void {
    console.log('Buscando:', this.nombreCasa);
  }

}
