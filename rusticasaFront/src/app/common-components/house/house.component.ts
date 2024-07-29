import { DomSanitizer } from '@angular/platform-browser';
import { Component, Input, OnInit } from '@angular/core';
import { CasaResponse } from 'src/app/shared/model/responses/casa-response.model';
import { ImagenResponse } from 'src/app/shared/model/responses/imagen-response.model';
import { CasaService } from 'src/app/shared/services/casa.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-house',
  templateUrl: './house.component.html',
  styleUrls: ['./house.component.scss'],
})
export class HouseComponent implements OnInit {
  @Input() datosCasa: CasaResponse;

  listaImagenes: ImagenResponse[];

  constructor(private casaServicio:CasaService, private sanitizer:DomSanitizer) {}

  ngOnInit(): void {
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
            this.listaImagenes[imagenes[imagen].posicionCarrusel] = imagenes[imagen];
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
  }
}
