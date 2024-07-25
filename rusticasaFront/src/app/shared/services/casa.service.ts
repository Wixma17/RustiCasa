import { environment } from './../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CasaResponse } from '../model/responses/casa-response.model';

@Injectable()
export class CasaService {
  constructor(private httpClient: HttpClient) {}

  getListaCasas(): Observable<CasaResponse[]> {
    let url = `${environment.urlApiCasas}listaCasas`;
    return this.httpClient.get<CasaResponse[]>(url);
  }

  // getFotosCasas(idCasa: number): Observable<ImagenResponse[]>{

  // }
}
