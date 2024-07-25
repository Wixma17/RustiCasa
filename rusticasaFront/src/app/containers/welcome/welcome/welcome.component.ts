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
              // Esta pipe mapea los datos para insertar un nuevo atributo con respecto a lo devuelto desde BBDD
              map((imagenes) =>
                // Mapea un atributo con el SafeResourceUrl necesario para mostrar la imagen
                imagenes.map((obj) => {
                  return {
                    ...obj,
                    safeUrl: this.sanitizer.bypassSecurityTrustResourceUrl(
                      obj.rutaImagen
                    ),
                  };
                })
              )
            )
            .subscribe({
              next: (imagenes) => {
                for (const imagen in imagenes) {
                  imagenes[imagenes[imagen].posicionCarrusel] = imagenes[imagen];
                }
                this.listaImagenes[casa.idCasa] = imagenes;
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
