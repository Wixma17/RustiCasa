import { Injectable } from '@angular/core';
import { CasaService } from './casa.service';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BusquedasService {
 /* private muestraBusquedaCabeceraSubject: BehaviorSubject<boolean> =
    new BehaviorSubject<boolean>(true);
  private paramBusquedaSubject: BehaviorSubject<string> =
    new BehaviorSubject<string>('');

  private muestraBusquedaCabecera$: Observable<boolean>;
  private paramBusqueda$: Observable<string>;*/

  constructor(private casaS: CasaService, private router: Router) {
   /* this.muestraBusquedaCabecera$ =
      this.muestraBusquedaCabeceraSubject.asObservable();
    this.paramBusqueda$ = this.paramBusquedaSubject.asObservable();*/
  }

  goBuscar(): void {
    this.router.navigate(['/full-search']);
  }

  /*getMuestraBusquedaCabecera(): Observable<boolean> {
    return this.muestraBusquedaCabecera$;
  }

  setMuestraBusquedaCabecera(state: boolean): void{
    this.muestraBusquedaCabeceraSubject.next(state);
  }

  getParamBusqueda(): Observable<string> {
    return this.paramBusqueda$;
  }

  setParamBusqueda(param: string): void {
    this.paramBusquedaSubject.next(param);
  }*/
}
