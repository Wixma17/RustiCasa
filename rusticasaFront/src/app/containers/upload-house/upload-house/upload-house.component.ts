import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MenuItem, MessageService, SelectItem } from 'primeng/api';
import { MunicipioResponse } from 'src/app/shared/model/responses/municipio-response.model';
import { ProvinciaResponse } from 'src/app/shared/model/responses/provincia-response.model';
import { MunicipioService } from 'src/app/shared/services/municipio.service';
import { ProvinciaService } from 'src/app/shared/services/provincia.service';

@Component({
  selector: 'app-upload-house',
  templateUrl: './upload-house.component.html',
  styleUrls: ['./upload-house.component.scss'],
})
export class UploadHouseComponent implements OnInit {
  ListadoProvincias: SelectItem[] = [];
  listadoPueblos: SelectItem[] = [];
  listaMunicipio: MunicipioResponse[] = [];
  listaProv: ProvinciaResponse[] = [];
  formGroup: FormGroup;
  activeIndex: number = 0;
  usuarioLog: any;
  items: MenuItem[] = [];
  idProv: number;
  selectedFile: File | null = null;
  isFormSubmitted: boolean = false;

  constructor(public messageService: MessageService, private fb: FormBuilder, private municipioService: MunicipioService, private provinciaService: ProvinciaService) {
    this.formGroup = this.fb.group({
      nombreCasa: ['', Validators.required],
      descripCasa: [''],
      provinciasS: [null],
      pueblos: [null]
    });
  }

  ngOnInit(): void {
    if (sessionStorage.getItem('datosUsu')) {
      this.usuarioLog = sessionStorage.getItem('datosUsu');
      console.info(this.usuarioLog);

      this.items = [
        { label: 'Datos Casa' },
        { label: 'Descripción Casa' },
        { label: 'Imágenes de tu Casa' },
      ];

      this.provinciaService.getListaProvincias().subscribe({
        next: (prov) => {
          this.listaProv = prov;
        },
        error: (err) => {
          console.error('Error=> ' + err);
        },
        complete: () => {
          this.ListadoProvincias.push({
            label: '--Selecciona la provincia--',
            value: null,
          });

          this.listaProv.forEach((prov) => {
            this.ListadoProvincias.push({
              label: prov.nombreProvincia,
              value: prov.idPronvincia,
            });
          });
        },
      });
    }
  }

  nextStep(): void {
    if (this.formGroup.valid) {
      if (this.activeIndex < this.items.length - 1) {
        this.activeIndex++;
      }
    } else {
      this.isFormSubmitted = true; // Marcar el formulario como enviado para mostrar errores
    }
  }

  previousStep(): void {
    if (this.activeIndex > 0) {
      this.activeIndex--;
    }
  }

  submitForm(): void {
    if (this.formGroup.valid) {
      console.log('Form submitted:', this.formGroup.value);
    }
  }

  cargaPueblos(): void {
    this.listaMunicipio = [];
    this.listadoPueblos = [];
    this.idProv = this.formGroup.value.provinciasS;

    this.municipioService.getListaMunicipio(this.idProv).subscribe({
      next: (mun) => {
        this.listaMunicipio = mun;
      },
      error: (err) => {
        console.error(err);
      },
      complete: () => {
        this.listadoPueblos.push({
          label: '--Selecciona el municipio--',
          value: null,
        });

        this.listaMunicipio.forEach((muni) => {
          this.listadoPueblos.push({
            label: muni.municipio,
            value: muni.idMunicipio,
          });
        });
      },
    });
  }

  onFileSelect(event: any): void {
    this.selectedFile = event.files[0];
  }
}
