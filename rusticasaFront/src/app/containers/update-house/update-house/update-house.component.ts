import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { SelectItem } from 'primeng/api';
import { Dropdown } from 'primeng/dropdown';
import { map } from 'rxjs/operators';
import { RequestRegistrarCasa } from 'src/app/shared/model/requests/request-registrar-casa-.model';
import { SubidaImagenCasaRequest } from 'src/app/shared/model/requests/request-subida-img-casa.model';
import { CasaResponse } from 'src/app/shared/model/responses/casa-response.model';
import { MunicipioResponse } from 'src/app/shared/model/responses/municipio-response.model';
import { ProvinciaResponse } from 'src/app/shared/model/responses/provincia-response.model';
import { CasaService } from 'src/app/shared/services/casa.service';
import { MunicipioService } from 'src/app/shared/services/municipio.service';
import { ProvinciaService } from 'src/app/shared/services/provincia.service';

@Component({
  selector: 'app-update-house',
  templateUrl: './update-house.component.html',
  styleUrls: ['./update-house.component.scss'],
})
export class UpdateHouseComponent implements OnInit {
  casa: CasaResponse;
  updateForm: FormGroup;
  listaProv: ProvinciaResponse[];
  ListadoProvincias: SelectItem[] = [];
  listaMunicipio: MunicipioResponse[];
  listadoPueblos: SelectItem[] = [];
  idProv: number;
  provSele: String = '-- Selecciona la provincia --';
  muniSele: String = '-- Selecciona el municipio --';
  @ViewChild('selectPueblos') selectPueblos!: Dropdown;
  listaImg: any[];
  selectedFile: File[] = [];
  usuarioLog: any;
  idMun: number;
  casaUpdate: RequestRegistrarCasa;
  ordenCarrusel: number[];

  constructor(
    private route: ActivatedRoute,
    private serviceHouse: CasaService,
    private sanitizer: DomSanitizer,
    private fb: FormBuilder,
    private municipioService: MunicipioService,
    private provinciaService: ProvinciaService,
    private casaService: CasaService,
    private router: Router
  ) {
    this.updateForm = this.fb.group({
      nombreCasa: ['', Validators.required],
      descripCasa: [''],
      sPis: [false],
      sMas: [false],
      sWif: [false],
      sJar: [false],
      nInquilinos: [0],
      nHabitaciones: [0],
      precio: [, Validators.required],
      provinciasS: [''],
      pueblos: [''],
    });
  }

  ngOnInit(): void {
    this.usuarioLog = JSON.parse(sessionStorage.getItem('datosUsu'));
    console.info(this.usuarioLog);

    const idCasaString = this.route.snapshot.paramMap.get('id');
    const idCasaLong = idCasaString ? parseInt(idCasaString, 10) : null;

    this.serviceHouse.getDatosCasaIdCasa(idCasaLong).subscribe({
      next: (casaR) => {
        this.casa = casaR;

        this.provinciaService
          .getCodProvincia(this.casa.municipio.idMunicipio)
          .subscribe((info) => {
            this.provinciaService
              .getNombreProvincia(info.codProv)
              .subscribe((prov) => {
                this.provSele = prov.nombre;
              });
          });

        this.municipioService
          .getNombreMunicipio(this.casa.municipio.idMunicipio)
          .subscribe((info) => {
            this.muniSele = info.nombre;
          });

        // Actualizar los valores del formulario con los datos de la casa
        this.updateForm.patchValue({
          nombreCasa: this.casa.nombreCasa,
          descripCasa: this.casa.descripcion,
          sPis: this.casa.piscina,
          sMas: this.casa.mascotas,
          sWif: this.casa.wifi,
          sJar: this.casa.jardin,
          nInquilinos: this.casa.numeroInquilinos,
          nHabitaciones: this.casa.numeroHabitaciones,
          precio: this.casa.precioNoche,
          provinciasS: this.provSele,
          pueblos: this.muniSele,
        });

        console.log(this.casa);
      },
      error: (err) => {
        console.error(err);
      },
    });

    this.provinciaService.getListaProvincias().subscribe({
      next: (prov) => {
        this.listaProv = [];
        this.listaProv = prov;
      },
      error: (err) => {
        console.error('Error=> ' + err);
      },
      complete: () => {
        this.ListadoProvincias.push({
          label: '-- Selecciona la provincia --',
          value: null,
        });

        this.listaProv.forEach((prov) => {
          this.ListadoProvincias.push({
            label: prov.nombreProvincia,
            value: prov.idPronvincia,
          });
        });
        console.info(this.ListadoProvincias);
      },
    });

    // Cargar las imágenes de la casa (si corresponde)
    this.serviceHouse
      .getFotosCasas(idCasaLong)
      .pipe(
        map((imagenes) =>
          imagenes.map((imagen) => ({
            ...imagen,
            safeUrl: this.sanitizer.bypassSecurityTrustResourceUrl(
              imagen.rutaImagen
            ),
          }))
        )
      )
      .subscribe({
        next: (img) => {
          this.ordenCarrusel = [];
          this.listaImg = [];
          for (let imagen of img) {
            this.ordenCarrusel[imagen.posicionCarrusel] =
              imagen.posicionCarrusel;
            this.listaImg[imagen.posicionCarrusel] = imagen;
          }
        },
        error: (err) => {
          console.error(err);
        },
      });
  }

  cargaPueblos(): void {
    this.listaMunicipio = [];
    this.listadoPueblos = [];
    this.idProv = this.updateForm.value.provinciasS;
    if (this.idProv) {
      this.municipioService.getListaMunicipio(this.idProv).subscribe({
        next: (mun) => {
          this.listaMunicipio = mun;
          console.info(this.listaMunicipio);
        },
        error: (err) => {
          console.error(err);
        },
        complete: () => {
          this.selectPueblos.setDisabledState(false);
          this.muniSele = '-- Seleccione el municipio --';
          this.listadoPueblos.push({
            label: '-- Selecciona el municipio --',
            value: null,
          });

          this.listaMunicipio.forEach((muni) => {
            this.listadoPueblos.push({
              label: muni.municipio,
              value: muni.idMunicipio,
            });
          });
          console.info(
            'Cargado pueblos de la provincia con id=> ' + this.idProv
          );
        },
      });
    } else {
      this.provSele = '-- Selecciona la provincia --';
      this.muniSele = '-- Selecciona el municipio --';
      this.updateForm.value.provinciasS = null;
      this.updateForm.value.pueblos = null;
      this.selectPueblos.setDisabledState(true);
    }
  }

  // Eliminar imagen
  eliminarImagen(index: number): void {
    const imagenAEliminar = this.listaImg[index];
    const idCasa = this.casa.idCasa;

    // Llamar al servicio para eliminar la imagen del servidor
    this.serviceHouse
      .eliminarImagen(imagenAEliminar.idImagen, idCasa)
      .subscribe({
        next: () => {
          this.listaImg.splice(index, 1);
        },
        error: (err) => {
          console.error('Error al eliminar imagen:', err);
        },
      });
  }

  // Manejar selección de nuevas imágenes
  onFileSelect(event: any): void {
    const fileList: FileList = event.files;

    for (let i = 0; i < fileList.length; i++) {
      const file = fileList[i];
      this.selectedFile.push(file);
    }
  }

  subeCasa() {
    if (typeof this.updateForm.value.pueblos === 'number') {
      this.municipioService
        .getDatosMunicipio(this.updateForm.value.pueblos)
        .subscribe((info) => {
          this.idMun = info.idMunicipio;
          this.actualizarCasa();
        });
    } else {
      this.idMun = this.casa.municipio.idMunicipio;
      this.actualizarCasa();
    }
  }

  actualizarCasa() {
    this.casaUpdate = {
      idCasa: this.casa.idCasa,
      descripcion: this.updateForm.value.descripCasa,
      nombreCasa: this.updateForm.value.nombreCasa,
      mascotas: this.updateForm.value.sMas,
      precioNoche: this.updateForm.value.precio,
      numeroHabitaciones: this.updateForm.value.nHabitaciones,
      numeroInquilinos: this.updateForm.value.nInquilinos,
      piscina: this.updateForm.value.sPis,
      wifi: this.updateForm.value.sWif,
      jardin: this.updateForm.value.sJar,
      idMunicipio: this.idMun,
      gmail: this.usuarioLog.gmail,
    };

    this.casaService.registrarCasa(this.casaUpdate).subscribe({
      next: (c) => {
        console.info('Casa registrada');
      },
      error: (err) => {
        console.error(err);
      },
    });

    let listaImg: SubidaImagenCasaRequest = {
      files: this.selectedFile,
      idCasa: this.casaUpdate.idCasa,
      idsImagenes: this.ordenCarrusel,
    };

    console.log(listaImg.files);

    this.casaService.subirImagenCasa(listaImg).subscribe({
      next:(s) => {
        console.log('Subida de imagenes con exito');
      },
      error:(err)=>{
        console.error(err);
      },
      complete:()=>{
        this.router.navigate(['/list-house-owner']);
      }
    });

  }

}
