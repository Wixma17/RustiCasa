import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ClienteResponse } from '../model/responses/cliente-response.model';
import { RequestLogin } from '../model/requests/request-login.model';
import { RequestCliente } from '../model/requests/request-register.model';

@Injectable({
  providedIn: 'root'
})
export class RegisterLoginService {

  constructor(private httpClient: HttpClient) { }

  login(cliente:RequestLogin){
    let url = `${environment.urlApiAuth}login`;
    return this.httpClient.post<ClienteResponse>(url,cliente);
  }

  register(cliente:RequestCliente){
    let url = `${environment.urlApiAuth}register`;
    return this.httpClient.post<ClienteResponse>(url,cliente);
  }
}
