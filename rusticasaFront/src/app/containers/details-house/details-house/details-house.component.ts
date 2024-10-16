import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService, PrimeNGConfig } from 'primeng/api';
import { merge, Observable, Subject, Subscription } from 'rxjs';
import { map, takeUntil } from 'rxjs/operators';
import { RequestReporte } from 'src/app/shared/model/requests/request-reporte.model';
import { CasaResponse } from 'src/app/shared/model/responses/casa-response.model';
import { ImagenResponse } from 'src/app/shared/model/responses/imagen-response.model';
import { OpinionResponse } from 'src/app/shared/model/responses/opinion-response.model';
import { CasaService } from 'src/app/shared/services/casa.service';
import { ReporteService } from 'src/app/shared/services/reporte.service';

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
  isDisabled: boolean = false;
  usuConn: any;
  idCasaString: string;
  idCasaLong: number;
  reportForm: FormGroup;
  men: any;
  isbloqueado: boolean = false;
  isIniSesion: boolean = false;

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
    private sanitizer: DomSanitizer,
    private router: Router,
    private casaService: CasaService,
    private formubuild: FormBuilder,
    private reporteService: ReporteService,
    private primengConfig: PrimeNGConfig,
    private messageService: MessageService
  ) {
    this.reportForm = this.formubuild.group({
      motivo: [],
    });
  }

  ngOnInit(): void {
    this.primengConfig.ripple = true;

    this.usuConn = JSON.parse(sessionStorage.getItem('datosUsu'));

    this.idCasaString = this.route.snapshot.paramMap.get('idCasa');
    this.idCasaLong = this.idCasaString
      ? parseInt(this.idCasaString, 10)
      : null;

    this.serviceHouse.getDatosCasaIdCasa(this.idCasaLong).subscribe({
      next: (casaR) => {
        this.casa = casaR;
        console.log(this.casa);
      },
      error: (err) => {
        console.error(err);
      },
      complete: () => {
        this.subscriptionPoint();
        console.info('Datos cargado de la casa correctamente');
      },
    });

    this.fotos$ = this.serviceHouse.getFotosCasas(this.idCasaLong).pipe(
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
    this.opiniones$ = this.serviceHouse
      .getListaOpinionCasa(this.idCasaLong)
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

    if (this.usuConn?.gmail != undefined) {
      this.casaService
        .getListaCasasPorGmail(this.usuConn.gmail)
        .subscribe((casas) => {
          casas.content.forEach((element) => {
            if (element.idCasa == this.idCasaLong) {
              this.isDisabled = true;
            }
          });
        });
    } else {
      this.isIniSesion = true;
    }
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

  goListOpinion() {
    this.router.navigate(['/opinion-list-house/' + this.casa.idCasa]);
  }

  goIniSesion() {
    this.router.navigate(['/login']);
  }

  goAlquilaCasa() {
    this.router.navigate(['/rent-house/' + this.casa.idCasa]);
  }

  seleccionarMotivo(motivo: string): void {
    this.reportForm.patchValue({ motivo });
  }

  reportUsu() {
    if (this.reportForm.valid) {
      console.log('Motivo seleccionado:');
      // Aquí puedes manejar la lógica de envío del reporte
    } else {
      console.log('No se ha seleccionado ningún motivo');
    }

    this.casaService.getGmailPorIdCasa(this.idCasaLong).subscribe((correo) => {
      let report: RequestReporte = {
        gmailReportado: correo.message,
        emisor: this.usuConn.gmail,
        fechaReporte: new Date(),
        motivo: this.reportForm.value.motivo,
      };

      console.info(report);

      this.reporteService.crearReporte(report).subscribe((info) => {
        this.men = 'Usuario Bloqueado con éxito';
        this.isbloqueado = true;
        this.messageService.add({
          severity: 'info',
          summary: 'Operación con éxito',
          detail: this.men,
        });

        const closeButton = document.querySelector(
          '#reportModal .btn-close'
        ) as HTMLElement;
        if (closeButton) {
          closeButton.click();
        }
      });
    });
  }
}
