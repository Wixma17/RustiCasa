import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { MunicipioResponse } from '../model/responses/municipio-response.model';

@Injectable({
  providedIn: 'root'
})
export class MunicipioService {

  constructor(private httpClient: HttpClient) { }

  getListaMunicipio(idProv:number): Observable<MunicipioResponse[]> {
    let url = `${environment.urlApiMunicipioProv}listaMunicipio/`+idProv;
    return this.httpClient.get<MunicipioResponse[]>(url);
  }

  getNombreMunicipio(idMun:number): Observable<any> {
    let url = `${environment.urlApiMunicipioProv}mun/`+idMun;
    return this.httpClient.get<any>(url);
  }
}
