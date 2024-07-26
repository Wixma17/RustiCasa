import { CasaService } from 'src/app/shared/services/casa.service';
import { Component, OnInit, Sanitizer } from '@angular/core';
import { CasaResponse } from 'src/app/shared/model/responses/casa-response.model';
import { ImagenResponse } from 'src/app/shared/model/responses/imagen-response.model';
import { DomSanitizer } from '@angular/platform-browser';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss'],
})
export class WelcomeComponent implements OnInit {
  constructor(
    private casaServicio: CasaService,
    private sanitizer: DomSanitizer
  ) {}

  listaCasaGenerica: CasaResponse[];
  listaImagenes: ImagenResponse[][] = [];

  ngOnInit(): void {
    this.casaServicio.getListaCasas().subscribe({
      next: (casas) => {
        this.listaCasaGenerica = casas;

        this.listaCasaGenerica.forEach((casa) => {
          this.casaServicio
            .getFotosCasas(casa.idCasa)
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
                let imagenesAux = [];
                for (const imagen in imagenes) {
                  imagenesAux[imagenes[imagen].posicionCarrusel] = imagenes[imagen];
                }
                this.listaImagenes[casa.idCasa] = imagenesAux;
              },
              error: (error) => {
                console.error(error);
              },
              complete: () => {
                console.log(
                  `Carga de datos de fotos de la casa [id: ${casa.idCasa}, nombre: ${casa.nombreCasa}] completa`
                );
              },
            });
        });
      },
      complete: () => {
        console.log('Casas actuales ->');
        console.log(this.listaCasaGenerica);
        console.log('Imágenes actuales ->');
        console.log(this.listaImagenes);
      },
    });
  }
}
