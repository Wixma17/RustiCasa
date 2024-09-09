import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MenuItem, MessageService, SelectItem } from 'primeng/api';
import { RequestRegistrarCasa } from 'src/app/shared/model/requests/request-registrar-casa-.model';
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
  formLocaCasa: FormGroup;
  activeIndex: number = 0;
  usuarioLog: any;
  items: MenuItem[] = [];
  idProv: number;
  selectedFile: File[] = [];
  isFormSubmitted: boolean = false;

  constructor(
    public messageService: MessageService,
    private fb: FormBuilder,
    private municipioService: MunicipioService,
    private provinciaService: ProvinciaService
  ) {
    this.formGroup = this.fb.group({
      nombreCasa: ['', Validators.required],
      descripCasa: [''],
      sPis:[false],
      sMas:[false],
      sWif:[false],
      sJar:[false],
      nInquilinos:[],
      nHabitaciones:[],
      precio:[, Validators.required]
    });

    this.formLocaCasa = this.fb.group({
      provinciasS: [null, Validators.required],
      pueblos: [null, Validators.required],
    });
  }

  ngOnInit(): void {
    if (sessionStorage.getItem('datosUsu')) {
      this.usuarioLog = JSON.parse(sessionStorage.getItem('datosUsu'));
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
    console.log(this.selectedFile);

    let registrarCasa:RequestRegistrarCasa={
      descripcion: this.formGroup.value.descripCasa,
      nombreCasa: this.formGroup.value.nombreCasa,
      mascotas: this.formGroup.value.sMas,
      precioNoche: this.formGroup.value.precio,
      numeroHabitaciones: this.formGroup.value.nHabitaciones,
      numeroInquilinos: this.formGroup.value.nInquilinos,
      piscina: this.formGroup.value.sPis,
      wifi: this.formGroup.value.sWif,
      jardin: this.formGroup.value.sJar,
      idMunicipio:  this.formLocaCasa.value.pueblos,
      gmail: this.usuarioLog.gmail
    }

    console.info(registrarCasa);
  }

  cargaPueblos(): void {
    this.listaMunicipio = [];
    this.listadoPueblos = [];
    this.idProv = this.formLocaCasa.value.provinciasS;

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
    const fileList: FileList = event.files; // Asumiendo que event.files es FileList

    // Recorrer usando un bucle for clásico
    for (let i = 0; i < fileList.length; i++) {
      const file = fileList[i];
      this.selectedFile.push(file);
    }
  }
}
