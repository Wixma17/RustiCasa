import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { CasaResponse } from '../model/responses/casa-response.model';
import { environment } from 'src/environments/environment';
import { RequestCasaSimple } from '../model/requests/request-casa-simple.model';

@Injectable({
  providedIn: 'root'
})
export class FiltroService {

  private casaSubject = new BehaviorSubject<any>([]);
  listaCasa$ = this.casaSubject.asObservable();

  constructor(private httpClient: HttpClient) { }

  getBusquedaSimple(request:RequestCasaSimple): Observable<any> {
    let url = `${environment.urlApiFiltro}busquedaSimple`;
    return this.httpClient.post<any>(url,request);
  }

  setListaCasa(data: CasaResponse[]): void {
    this.casaSubject.next(data);
  }

}
