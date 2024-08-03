import { ProvinciaService } from './../../../shared/services/provincia.service';
import { CasaService } from 'src/app/shared/services/casa.service';
import { Component, OnInit, Sanitizer } from '@angular/core';
import { CasaResponse } from 'src/app/shared/model/responses/casa-response.model';
import { ImagenResponse } from 'src/app/shared/model/responses/imagen-response.model';
import { DomSanitizer } from '@angular/platform-browser';
import { map } from 'rxjs/operators';
import { FormBuilder, FormGroup } from '@angular/forms';
import { SelectItem } from 'primeng/api';
import { MunicipioResponse } from 'src/app/shared/model/responses/municipio-response.model';
import { ProvinciaResponse } from 'src/app/shared/model/responses/provincia-response.model';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss'],
})
export class WelcomeComponent implements OnInit {
  constructor(
    private casaServicio: CasaService,
    private sanitizer: DomSanitizer,
    private formubuild: FormBuilder,
    private provinciaService: ProvinciaService
  ) {}

  buscaFormu: FormGroup;
  ListadoProvincias: SelectItem[] = [];
  municipio: MunicipioResponse;
  listaProv: ProvinciaResponse[];
  provinciaSelect:string='';

  listaCasaResultado: CasaResponse[];
  listaImagenes: ImagenResponse[][] = [];

  ngOnInit(): void {
    this.provinciaService.getListaProvincias().subscribe({
      next: (prov) => {
        this.listaProv = prov;
      },
      error: (err) => {
        console.error('Error=> ' + err);
      },
      complete: () => {
        this.listaProv.forEach((prov) => {
          this.ListadoProvincias.push({
            label: prov.nombreProvincia,
            value: prov.idPronvincia,
          });
        });
        console.info(this.ListadoProvincias);
      },
    });

    this.buscaFormu = this.formubuild.group({
      provinciasS: [this.provinciaSelect],
    });
  }

  buscarCasaSimple(): void {
    const provinciaSeleccionada = this.buscaFormu.get('provinciasS').value;
    console.log('Provincia seleccionada:', provinciaSeleccionada);
  }
}
