import { Component, OnDestroy, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { merge, Observable, Subject, Subscription } from 'rxjs';
import { map, takeUntil } from 'rxjs/operators';
import { CasaResponse } from 'src/app/shared/model/responses/casa-response.model';
import { ImagenResponse } from 'src/app/shared/model/responses/imagen-response.model';
import { OpinionResponse } from 'src/app/shared/model/responses/opinion-response.model';
import { CasaService } from 'src/app/shared/services/casa.service';


@Component({
  selector: 'app-details-house',
  templateUrl: './details-house.component.html',
  styleUrls: ['./details-house.component.scss'],
})
export class DetailsHouseComponent implements OnInit, OnDestroy {
  casa: CasaResponse;
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
    private route: ActivatedRoute,
    private serviceHouse: CasaService,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit(): void {
    const idCasaString = this.route.snapshot.paramMap.get('idCasa');
    const idCasaLong = idCasaString ? parseInt(idCasaString, 10) : null;

    this.serviceHouse.getDatosCasaIdCasa(idCasaLong).subscribe({
      next: (casaR) => {
        this.casa = casaR;
      },
      error: (err) => {
        console.error(err);
      },
      complete: () => {
        this.subscriptionPoint();
        console.info('Datos cargado de la casa correctamente');
      },
    });

    this.fotos$ = this.serviceHouse.getFotosCasas(idCasaLong).pipe(
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
    this.opiniones$ = this.serviceHouse.getListaOpinionCasa(idCasaLong).pipe(
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
              `Carga de datos de fotos de la casa [id: ${this.casa.idCasa}, nombre: ${this.casa.nombreCasa}] completa`
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
        complete: () => {
          console.info(this.listaImagenes);
        },
      });
  }

  ngOnDestroy(): void {
    this.destroySubject.next();
  }
}
