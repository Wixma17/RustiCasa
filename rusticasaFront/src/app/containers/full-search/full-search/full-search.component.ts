import { Component, OnInit } from '@angular/core';
import { BusquedasService } from 'src/app/shared/services/busquedas.service';

@Component({
  selector: 'app-full-search',
  templateUrl: './full-search.component.html',
  styleUrls: ['./full-search.component.scss'],
})
export class FullSearchComponent implements OnInit {

  valorBusqueda: string;

  constructor(private busqueda: BusquedasService) {}

  ngOnInit(): void {}

  buscarCasa() {
    this.busqueda.buscar(this.valorBusqueda);
  }
}
