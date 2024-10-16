import { Injectable, Sanitizer } from '@angular/core';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { ClienteResponse } from '../model/responses/cliente-response.model';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { ClienteService } from './cliente.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { RequestCliente } from '../model/requests/request-register.model';
import { SubidaImagenRequest } from '../model/requests/request-subida-imagenesRequest.model';
import { catchError } from 'rxjs/operators'; // Importar catchError

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private userDataSubject = new BehaviorSubject<any>(null);
  userData$: Observable<any>;
  rutaImg$: Observable<any>;
  private rutaImgSubject = new BehaviorSubject<SafeResourceUrl>(null);

  constructor(
    private httpClient: HttpClient,
    private clienteService: ClienteService,
    private sanitizer: DomSanitizer
  ) {
    this.userData$ = this.userDataSubject.asObservable();
    this.rutaImg$ = this.rutaImgSubject.asObservable();

    const storedUserData = JSON.parse(sessionStorage.getItem('datosUsu')!);
    if (storedUserData) {
      this.userDataSubject.next(storedUserData);
      this.clienteService
        .getRutaFotoPerfil(storedUserData.gmail)
        .subscribe((ruta) => {
          this.rutaImgSubject.next(
            this.sanitizer.bypassSecurityTrustResourceUrl(ruta.urlImg)
          );
        });
    }
  }

  // Manejo de errores
  private handleError(error: HttpErrorResponse): Observable<never> {
    let errorMsg: string;
    if (error.status === 403) {
      errorMsg = 'El usuario está bloqueado.';
    } else if (error.status === 401) {
      errorMsg = 'Credenciales incorrectas.';
    } else {
      errorMsg = 'Ocurrió un error al procesar la solicitud.';
    }
    console.error('Error en la solicitud:', errorMsg);
    return throwError(() => new Error(errorMsg));
  }

  getDatosUsuEmail(email: string): Observable<ClienteResponse> {
    let url = `${environment.urlApiAuth}datosUsuario`;
    return this.httpClient.post<ClienteResponse>(url, email)
      .pipe(
        catchError(this.handleError) // Maneja el error con catchError
      );
  }

  registrarUsuario(register: RequestCliente): Observable<any> {
    let url = `${environment.urlApiAuth}registerUser`;
    return this.httpClient.post<any>(url, register)
      .pipe(
        catchError(this.handleError) // Maneja el error con catchError
      );
  }

  subirImagenPerfil(data: SubidaImagenRequest): Observable<any> {
    let url = `${environment.urlApiAuth}subirImagenesUser`;
    console.log(data);

    // Crear una instancia de FormData
    const formData = new FormData();
    formData.append('gmail', data.gmail);

    if (data.files) {
      formData.append('files', data.files, data.files.name);
      console.info("Sube la imagen");
    } else {
      console.error('No se ha proporcionado ningún archivo.');
      return throwError(() => new Error('No se ha proporcionado ningún archivo.'));
    }

    return this.httpClient.post<any>(url, formData)
      .pipe(
        catchError(this.handleError) // Maneja el error con catchError
      );
  }

  updateUserData(data: any) {
    sessionStorage.setItem('datosUsu', JSON.stringify(data));
    this.userDataSubject.next(data);

    this.clienteService.getRutaFotoPerfil(data.gmail).subscribe((ruta) => {
      this.rutaImgSubject.next(
        this.sanitizer.bypassSecurityTrustResourceUrl(ruta.urlImg)
      );
    });
  }

  clearUserData() {
    sessionStorage.removeItem('datosUsu');
    this.userDataSubject.next(null);
  }
}
