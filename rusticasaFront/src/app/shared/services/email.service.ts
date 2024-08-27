import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { EmailResponse } from '../model/responses/email-response.model';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class EmailService {

  constructor(private httpClient: HttpClient) { }

  enviarEmail(email: EmailResponse): Observable<string> {
    let url = `${environment.urlApiEmail}sendEmail`;
    return this.httpClient.post<string>(url, email)
      .pipe(
        catchError(error => {
          console.error('Error al enviar el correo', error);
          return throwError(error);
        })
      );
}

}
