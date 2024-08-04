import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CasaResponse } from '../model/responses/casa-response.model';
import { environment } from 'src/environments/environment';
import { RequestCasaSimple } from '../model/requests/request-casa-simple.model';

@Injectable({
  providedIn: 'root'
})
export class FiltroService {

  constructor(private httpClient: HttpClient) { }

  getListaProvincias(request:RequestCasaSimple): Observable<CasaResponse[]> {
    let url = `${environment.urlApiFiltro}busquedaSimple`;
    return this.httpClient.get<CasaResponse[]>(url);
  }

}
