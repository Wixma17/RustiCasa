import { Injectable, Sanitizer } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { ClienteResponse } from '../model/responses/cliente-response.model';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { ClienteService } from './cliente.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private userDataSubject = new BehaviorSubject<any>(null);
  userData$:Observable<any>;
  rutaImg$:Observable<any>
  private rutaImgSubject = new BehaviorSubject<SafeResourceUrl>(null);


  constructor(private httpClient: HttpClient,private clienteService:ClienteService, private sanitizer: DomSanitizer) {
    this.userData$ = this.userDataSubject.asObservable();
    this.rutaImg$ = this.rutaImgSubject.asObservable();

    const storedUserData = JSON.parse(sessionStorage.getItem('datosUsu')!);
    if (storedUserData) {
      this.userDataSubject.next(storedUserData);
      this.clienteService.getRutaFotoPerfil(storedUserData.gmail).subscribe((ruta)=>{
        this.rutaImgSubject.next(this.sanitizer.bypassSecurityTrustResourceUrl(ruta.urlImg));
      });
    }
  }

  getDatosUsuEmail(email:string): Observable<ClienteResponse> {
    let url = `${environment.urlApiAuth}datosUsuario`;
    return this.httpClient.post<ClienteResponse>(url,email);
  }

  updateUserData(data: any) {
    sessionStorage.setItem('datosUsu', JSON.stringify(data));
    this.userDataSubject.next(data);

    this.clienteService.getRutaFotoPerfil(data.gmail).subscribe((ruta)=>{
      this.rutaImgSubject.next(this.sanitizer.bypassSecurityTrustResourceUrl(ruta.urlImg));
    });
  }

  clearUserData() {
    sessionStorage.removeItem('datosUsu');
    this.userDataSubject.next(null);
  }
}
