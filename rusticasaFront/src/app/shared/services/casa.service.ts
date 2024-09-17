import { environment } from './../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CasaResponse } from '../model/responses/casa-response.model';
import { ImagenResponse } from '../model/responses/imagen-response.model';
import { OpinionResponse } from '../model/responses/opinion-response.model';
import { RequestRegistrarCasa } from '../model/requests/request-registrar-casa-.model';
import { SubidaImagenCasaRequest } from '../model/requests/request-subida-img-casa.model';

@Injectable()
export class CasaService {
  constructor(private httpClient: HttpClient) {}

  getListaCasas(): Observable<CasaResponse[]> {
    let url = `${environment.urlApiCasas}listaCasas`;
    return this.httpClient.get<CasaResponse[]>(url);
  }

  getFotosCasas(idCasa: number): Observable<ImagenResponse[]> {
    let url = `${environment.urlApiCasas}fotosCasa/${idCasa}`;
    return this.httpClient.get<ImagenResponse[]>(url);
  }

  getListaCasasPorGmail(gmail: string): Observable<any> {
    let url = `${environment.urlApiCasas}listaCasasUsuario/${gmail}`;
    return this.httpClient.get<any>(url);
  }

  getListaOpinionCasa(idCasa: number): Observable<OpinionResponse[]> {
    let url = `${environment.urlApiCasas}opinionCasa/${idCasa}`;
    return this.httpClient.get<OpinionResponse[]>(url);
  }

  getPrecioAltoNoche(): Observable<number> {
    let url = `${environment.urlApiCasas}precioMaximo`;
    return this.httpClient.get<number>(url);
  }

  getPrecioBajoNoche(): Observable<number> {
    let url = `${environment.urlApiCasas}precioMinimo`;
    return this.httpClient.get<number>(url);
  }

  getDatosCasaIdCasa(idCasa: number): Observable<CasaResponse> {
    let url = `${environment.urlApiCasas}datosCasa/${idCasa}`;
    return this.httpClient.get<CasaResponse>(url);
  }

  registrarCasa(request: RequestRegistrarCasa): Observable<any> {
    let url = `${environment.urlApiCasas}registrarCasa`;
    return this.httpClient.post<any>(url, request);
  }

  subirImagenCasa(request: SubidaImagenCasaRequest): Observable<any> {
    let url = `${environment.urlApiCasas}subirImagenes`;
    const formData: FormData = new FormData();
    request.files.forEach((file: File) => {
      formData.append('files', file, file.name);
    });
    formData.append('idCasa', request.idCasa.toString());
    return this.httpClient.post<any>(url, formData, {
      headers: {},
    });
  }

  eliminarImagen(idImagen: number, idCasa: number): Observable<any> {
    let url= `${environment.urlApiCasas}eliminar/${idImagen}?idCasa=${idCasa}`;
    return this.httpClient.delete<any>(url);
  }

}
