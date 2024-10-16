import { Component, Input, OnInit } from '@angular/core';
import * as L from 'leaflet';
import { MunicipioResponse } from 'src/app/shared/model/responses/municipio-response.model';

@Component({
  selector: 'app-mapa',
  templateUrl: './mapa.component.html',
  styleUrls: ['./mapa.component.scss'],
})
export class MapaComponent implements OnInit {
  @Input() datosLoc: MunicipioResponse;

  private map: L.Map | undefined;

  // Define el icono personalizado
  private readonly customIcon = L.icon({
    iconUrl: 'assets/custom-icon.png', // Reemplaza con la URL de tu imagen
    iconSize: [32, 32], // Tamaño del icono
    iconAnchor: [16, 32], // Ancla del icono (donde el punto del marcador se sitúa respecto al icono)
    popupAnchor: [0, -32], // Ancla del popup (donde se sitúa el popup respecto al icono)
  });

  constructor() {}

  ngOnInit(): void {
    this.initMap();
  }

  private initMap(): void {
    if (typeof L !== 'undefined' && this.datosLoc) {
      // Usa las coordenadas como una tupla [latitud, longitud]
      const latLng: L.LatLngExpression = [
        this.datosLoc.latitud,
        this.datosLoc.longitud,
      ];

      // Inicializa el mapa y establece las coordenadas y el nivel de zoom
      this.map = L.map('map').setView(latLng, 13);

      // Añade un tile layer de OpenStreetMap
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      }).addTo(this.map);

      // Añade un marcador en las coordenadas deseadas con el icono personalizado
      L.marker(latLng, { icon: this.customIcon })
        .addTo(this.map)
        .bindPopup('🏠 Ubicación de '+this.datosLoc.municipio+'!')
        .openPopup();
    } else {
      console.error('Leaflet is not loaded or datosLoc is missing');
    }
  }
}
