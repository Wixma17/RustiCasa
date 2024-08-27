import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  constructor(private httpClient: HttpClient) { }

  getRutaFotoPerfil(gmail:string): Observable<any> {
    let url = `${environment.urlApiCliente}fotoPerfil/${gmail}`;
    return this.httpClient.get<any>(url);
  }

  isClienteExiste(gmail:string): Observable<any> {
    let url = `${environment.urlApiCliente}cliente/${gmail}`;
    return this.httpClient.get<any>(url);
  }
}
