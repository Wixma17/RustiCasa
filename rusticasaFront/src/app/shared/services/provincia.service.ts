import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ProvinciaResponse } from '../model/responses/provincia-response.model';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProvinciaService {

  constructor(private httpClient: HttpClient) { }

  getListaProvincias(): Observable<ProvinciaResponse[]> {
    let url = `${environment.urlApiMunicipioProv}listaProvincias`;
    return this.httpClient.get<ProvinciaResponse[]>(url);
  }
}
