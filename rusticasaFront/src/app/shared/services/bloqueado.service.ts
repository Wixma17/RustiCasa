import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RequestBloqueado } from '../model/requests/request-bloqueado.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BloqueadoService {

  constructor(private httpClient: HttpClient) { }

  crearBloqueo(request:RequestBloqueado){
    let url = `${environment.urlApiBloqueo}bloquear`;
    return this.httpClient.post<any>(url,request);
  }

  elimnarBloqueo(email:string){
    let url = `${environment.urlApiBloqueo}eliminar/${email}`;
    return this.httpClient.delete<any>(url);
  }

  consultaBloqueo(email:string){
    let url = `${environment.urlApiBloqueo}existeBloqueado/${email}`;
    return this.httpClient.get<any>(url);
  }
}
