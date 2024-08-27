import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  constructor(private httpClient: HttpClient) { }

  getRutaFotoPerfil(gmail:string): Observable<string> {
    let url = `${environment.urlApiCliente}listaCasas/${gmail}`;
    return this.httpClient.get<string>(url);
  }
}
