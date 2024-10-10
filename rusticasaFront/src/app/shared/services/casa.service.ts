import { environment } from './../../../environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CasaResponse } from '../model/responses/casa-response.model';
import { ImagenResponse } from '../model/responses/imagen-response.model';
import { OpinionResponse } from '../model/responses/opinion-response.model';
import { RequestRegistrarCasa } from '../model/requests/request-registrar-casa-.model';
import { SubidaImagenCasaRequest } from '../model/requests/request-subida-img-casa.model';
import { RequestOpinion } from '../model/requests/request-opina.model';
import { RequestAlquilaCasa } from '../model/requests/request-alquilar-casa.model';

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

  getListaOpinionCasaPage(
    idCasa: number,
    page: number = 0,
    size: number = 10
  ): Observable<any> {
    const url = `${environment.urlApiCasas}opinionCasaPage/${idCasa}`;
    const params = { page: page.toString(), size: size.toString() }; // Parámetros de paginación
    return this.httpClient.get<any>(url, { params });
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

    // Agregar archivos al FormData
    request.files.forEach((file: File) => {
      formData.append('files', file, file.name);
    });

    // Agregar idCasa al FormData
    formData.append('idCasa', request.idCasa.toString());

    // Agregar idsImagenes al FormData si se proporciona
    if (request.idsImagenes && request.idsImagenes.length > 0) {
      request.idsImagenes.forEach((id: number) => {
        formData.append('idsImagenes', id.toString());
      });
    }

    // Enviar la solicitud POST al backend
    return this.httpClient.post<any>(url, formData, {
      headers: {},
    });
  }

  eliminarImagen(idImagen: number, idCasa: number): Observable<any> {
    let url = `${environment.urlApiCasas}eliminar/${idImagen}?idCasa=${idCasa}`;
    return this.httpClient.delete<any>(url);
  }

  publicaOpi(opiRequest: RequestOpinion): Observable<any> {
    let url = `${environment.urlApiCasas}subirOpinion`;
    return this.httpClient.post<any>(url, opiRequest);
  }

  alquilaCasa(rentHouseRequest: RequestAlquilaCasa): Observable<any> {
    let url = `${environment.urlApiCasas}reservarCasa`;
    return this.httpClient.post<any>(url, rentHouseRequest);
  }

  getListaCasaAlquilado(gmail: string): Observable<any> {
    let url = `${environment.urlApiCasas}alquileres/${gmail}`;
    return this.httpClient.get<any>(url);
  }

  getCasasByFechas(
    fechaEntrada: Date,
    fechaSalida: Date
  ): Observable<number[]> {
    const params = {
      fechaEntrada: fechaEntrada.toISOString(),
      fechaSalida: fechaSalida.toISOString(),
    };
    return this.httpClient.get<number[]>(
      `${environment.urlApiCasas}casasIdAlquiladas`,
      { params }
    );
  }

  eliminarAlquiler(
    gmail: string,
    idCasa: number,
    fechaEntrada: Date
  ): Observable<any> {
    let params = new HttpParams()
      .set('gmail', gmail)
      .set('idCasa', idCasa.toString())
      .set('fechaEntrada', fechaEntrada.toISOString().split('T')[0]); // Formato de fecha 'YYYY-MM-DD'

    return this.httpClient.delete<any>(`${environment.urlApiCasas}eliminar`, {
      params,
    });
  }

  eliminarCasa(idCasa: number): Observable<any> {
    let url = `${environment.urlApiCasas}eliminarCasa/${idCasa}`;
    return this.httpClient.delete<any>(url);
  }

  getCasasPorMes() {
    let url = `${environment.urlApiCasas}por-mes`;
    return this.httpClient.get<any>(url);
  }

  getGmailPorIdCasa(idCasa) {
    let url = `${environment.urlApiCasas}${idCasa}/publicador`;
    return this.httpClient.get<any>(url);
  }

  getEstadoCasaPorGmail(gmail) {
    let url = `${environment.urlApiCasas}estados-casas/${gmail}`;
    return this.httpClient.get<any>(url);
  }

  getNumeroSolicitudPorGmail(gmail) {
    let url = `${environment.urlApiCasas}numero-solicitudes/${gmail}`;
    return this.httpClient.get<any>(url);
  }

  getEstadoCasaPorGmailInteresado(gmail) {
    let url = `${environment.urlApiCasas}estado-solicitudes-interesado/${gmail}`;
    return this.httpClient.get<any>(url);
  }

  updateEstadoCasa(idCasa: number, nuevoEstado: string) {
    let url = `${environment.urlApiCasas}actualizar-estado?idCasa=${idCasa}&nuevoEstado=${nuevoEstado}`;
    return this.httpClient.put<any>(url, {});
  }

  getInfoCasasPorEmailPropietario(gmail: string, page: number, size: number) {
    let url = `${environment.urlApiCasas}casasInfoAlquiladas/${gmail}?page=${page}&size=${size}`;
    return this.httpClient.get<any>(url);
}


}
