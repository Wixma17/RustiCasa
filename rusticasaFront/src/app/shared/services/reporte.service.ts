import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { RequestReporte } from '../model/requests/request-reporte.model';

@Injectable({
  providedIn: 'root'
})
export class ReporteService {

  constructor(private httpClient: HttpClient) { }

  crearReporte(report:RequestReporte){
    let url = `${environment.urlApiReporte}crearReport`;
    return this.httpClient.post<any>(url,report);
  }

  numeroReportes(gmail:string){
    let url = `${environment.urlApiReporte}count/${gmail}`;
    return this.httpClient.get<any>(url);
  }

  eliminarReportes(gmail:string){
    let url = `${environment.urlApiReporte}eliminarReporte/${gmail}`;
    return this.httpClient.delete<any>(url);
  }
}
