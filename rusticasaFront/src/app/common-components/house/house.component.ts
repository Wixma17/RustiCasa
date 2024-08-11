  import { DomSanitizer } from '@angular/platform-browser';
  import { Component, Input, OnInit } from '@angular/core';
  import { CasaResponse } from 'src/app/shared/model/responses/casa-response.model';
  import { ImagenResponse } from 'src/app/shared/model/responses/imagen-response.model';
  import { CasaService } from 'src/app/shared/services/casa.service';
  import { map } from 'rxjs/operators';
  import { OpinionResponse } from 'src/app/shared/model/responses/opinion-response.model';

  @Component({
    selector: 'app-house',
    templateUrl: './house.component.html',
    styleUrls: ['./house.component.scss'],
  })
  export class HouseComponent implements OnInit {
    @Input() datosCasa: CasaResponse;

    listaImagenes: ImagenResponse[];
    listaOpinionCasa: OpinionResponse[];
    showMore: boolean = false;
    mediaOp: number = 0;

    constructor(
      private casaServicio: CasaService,
      private sanitizer: DomSanitizer
    ) {
    }

    ngOnInit(): void {
      console.log(this.datosCasa);
      this.casaServicio
        .getFotosCasas(this.datosCasa.idCasa)
        .pipe(
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
        )
        .subscribe({
          next: (imagenes) => {
            this.listaImagenes = [];
            for (const imagen in imagenes) {
              this.listaImagenes[imagenes[imagen].posicionCarrusel] =
                imagenes[imagen];
            }
          },
          error: (error) => {
            console.error(error);
          },
          complete: () => {
            console.log(
              `Carga de datos de fotos de la casa [id: ${this.datosCasa.idCasa}, nombre: ${this.datosCasa.nombreCasa}] completa`
            );
          },
        });

      /*------------------------------------------*/

      this.casaServicio.getListaOpinionCasa(this.datosCasa.idCasa).subscribe({
        next: (op) => {
          this.listaOpinionCasa = op;

          // Inicializa la variable de la media
          let sumaPuntuaciones = 0;

          // Suma todas las puntuaciones
          this.listaOpinionCasa.forEach((opi) => {
            sumaPuntuaciones += opi.puntuacion;
          });

          // Calcula la media solo si hay opiniones
          if (this.listaOpinionCasa.length > 0) {
            this.mediaOp = Math.floor(sumaPuntuaciones / this.listaOpinionCasa.length);
          } else {
            this.mediaOp = 0;
          }
        },
        error: (err) => {
          console.error(err);
        },
        complete: () => {
          console.info('media opiniones => ' + this.mediaOp);
        },
      });



    }
  }
