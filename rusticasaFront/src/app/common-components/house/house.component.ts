import { DomSanitizer } from '@angular/platform-browser';
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { CasaResponse } from 'src/app/shared/model/responses/casa-response.model';
import { ImagenResponse } from 'src/app/shared/model/responses/imagen-response.model';
import { CasaService } from 'src/app/shared/services/casa.service';
import { map, takeUntil } from 'rxjs/operators';
import { OpinionResponse } from 'src/app/shared/model/responses/opinion-response.model';
import { merge, Observable, Subject, Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-house',
  templateUrl: './house.component.html',
  styleUrls: ['./house.component.scss'],
})
export class HouseComponent implements OnInit, OnDestroy {
  @Input() datosCasa: CasaResponse;

  listaImagenes: any[];
  listaOpinionCasa: any[];
  mediaOp: number = 0;

  // Subjects
  private destroySubject = new Subject<void>();

  // Observables
  fotos$: Observable<ImagenResponse[]>;
  opiniones$: Observable<OpinionResponse[]>;

  // Suscripción principal
  mainSubscription: Subscription;

  constructor(
    private casaServicio: CasaService,
    private sanitizer: DomSanitizer,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.fotos$ = this.casaServicio.getFotosCasas(this.datosCasa.idCasa).pipe(
      map((imagenes) =>
        imagenes.map((imagen) => {
          return {
            ...imagen,
            safeUrl: this.sanitizer.bypassSecurityTrustResourceUrl(
              imagen.rutaImagen
            ),
          };
        })
      )
    );
    this.opiniones$ = this.casaServicio
      .getListaOpinionCasa(this.datosCasa.idCasa)
      .pipe(
        map((op) => {
          this.listaOpinionCasa = op;

          // Inicializa la variable de la media
          let sumaPuntuaciones = 0;

          // Suma todas las puntuaciones
          this.listaOpinionCasa.forEach((opi) => {
            sumaPuntuaciones += opi.puntuacion;
          });

          // Calcula la media solo si hay opiniones
          if (this.listaOpinionCasa.length > 0) {
            this.mediaOp = Math.floor(
              sumaPuntuaciones / this.listaOpinionCasa.length
            );
          } else {
            this.mediaOp = 0;
          }

          return op;
        })
      );
    this.subscriptionPoint();
  }

  subscriptionPoint(): void {
    merge(this.fotos$, this.opiniones$)
      .pipe(takeUntil(this.destroySubject))
      .subscribe({
        next: (result) => {
          // Determina si el resultado es una lista de imágenes o de opiniones
          if (
            Array.isArray(result) &&
            result.length > 0 &&
            'rutaImagen' in result[0]
          ) {
            // Es una lista de imágenes
            this.listaImagenes = [];
            for (const imagen of result) {
              this.listaImagenes[imagen['posicionCarrusel']] = imagen;
            }
            console.log(
              `Carga de datos de fotos de la casa [id: ${this.datosCasa.idCasa}, nombre: ${this.datosCasa.nombreCasa}] completa`
            );
          } else if (
            Array.isArray(result) &&
            result.length > 0 &&
            'puntuacion' in result[0]
          ) {
            // Es una lista de opiniones
            this.listaOpinionCasa = result;

            // Inicializa la variable de la media
            let sumaPuntuaciones = 0;

            // Suma todas las puntuaciones
            this.listaOpinionCasa.forEach((opi) => {
              sumaPuntuaciones += opi.puntuacion;
            });

            // Calcula la media solo si hay opiniones
            if (this.listaOpinionCasa.length > 0) {
              this.mediaOp = Math.floor(
                sumaPuntuaciones / this.listaOpinionCasa.length
              );
            } else {
              this.mediaOp = 0;
            }
            console.info('media opiniones => ' + this.mediaOp);
          }
        },
        error: (error) => {
          console.error(error);
        },
      });
  }

  ngOnDestroy(): void {
    this.destroySubject.next();
  }

  detalleCasa() {
    this.router.navigate(['/details-house/' + this.datosCasa.idCasa]);
  }

  goListOpinion(){
    this.router.navigate(['/opinion-list-house/'+this.datosCasa.idCasa]);
  }
}
