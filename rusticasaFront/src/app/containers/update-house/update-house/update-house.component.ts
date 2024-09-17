import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { SelectItem } from 'primeng/api';
import { Dropdown } from 'primeng/dropdown';
import { map } from 'rxjs/operators';
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

  constructor(
    private route: ActivatedRoute,
    private serviceHouse: CasaService,
    private sanitizer: DomSanitizer,
    private fb: FormBuilder,
    private municipioService: MunicipioService,
    private provinciaService: ProvinciaService
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
    const idCasaString = this.route.snapshot.paramMap.get('id');
    const idCasaLong = idCasaString ? parseInt(idCasaString, 10) : null;

    this.serviceHouse.getDatosCasaIdCasa(idCasaLong).subscribe({
      next: (casaR) => {
        this.casa = casaR;

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
          this.listaImg = img;
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

  onFileSelect(event: any): void {
    const fileList: FileList = event.files; // Asumiendo que event.files es FileList

    // Recorrer usando un bucle for clásico
    for (let i = 0; i < fileList.length; i++) {
      const file = fileList[i];
      this.selectedFile.push(file);
    }
  }
}
