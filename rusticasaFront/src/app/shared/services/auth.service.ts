import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { ClienteResponse } from '../model/responses/cliente-response.model';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private userDataSubject = new BehaviorSubject<any>(null);
  userData$ = this.userDataSubject.asObservable();

  constructor(private httpClient: HttpClient) {
    const storedUserData = JSON.parse(sessionStorage.getItem('datosUsu')!);
    if (storedUserData) {
      this.userDataSubject.next(storedUserData);
    }
  }

  getDatosUsuEmail(email:string): Observable<ClienteResponse> {
    let url = `${environment.urlApiAuth}datosUsuario`;
    return this.httpClient.post<ClienteResponse>(url,email);
  }

  updateUserData(data: any) {
    sessionStorage.setItem('datosUsu', JSON.stringify(data));
    this.userDataSubject.next(data);
  }

  clearUserData() {
    sessionStorage.removeItem('datosUsu');
    this.userDataSubject.next(null);
  }
}
