import { environment } from './../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CasaResponse } from '../model/responses/casa-response.model';
import { ImagenResponse } from '../model/responses/imagen-response.model';
import { OpinionResponse } from '../model/responses/opinion-response.model';

@Injectable()
export class CasaService {
  constructor(private httpClient: HttpClient) {}

  getListaCasas(): Observable<CasaResponse[]> {
    let url = `${environment.urlApiCasas}listaCasas`;
    return this.httpClient.get<CasaResponse[]>(url);
  }

  getFotosCasas(idCasa: number): Observable<ImagenResponse[]>{
    let url = `${environment.urlApiCasas}fotosCasa/${idCasa}`;
    return this.httpClient.get<ImagenResponse[]>(url);
  }

  getListaCasasPorNombre(nombreCasa:string): Observable<CasaResponse[]> {
    let url = `${environment.urlApiCasas}listaCasasPorNombre/${nombreCasa}`;
    return this.httpClient.get<CasaResponse[]>(url);
  }

  getListaOpinionCasa(idCasa:number): Observable<OpinionResponse[]> {
    let url = `${environment.urlApiCasas}opinionCasa/${idCasa}`;
    return this.httpClient.get<OpinionResponse[]>(url);
  }

  getPrecioAltoNoche(): Observable<number> {
    let url = `${environment.urlApiCasas}precioMaximo`;
    return this.httpClient.get<number>(url);
  }

  getPrecioBajoNoche(): Observable<number> {
    let url = `${environment.urlApiCasas}precioMinimo`;
    return this.httpClient.get<number>(url);
  }

}
