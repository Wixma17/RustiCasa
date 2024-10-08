import { AfterViewInit, Component, OnInit } from '@angular/core';
import * as Chart from 'chart.js';
import { CasaService } from 'src/app/shared/services/casa.service';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.scss']
})
export class StatisticsComponent implements OnInit, AfterViewInit {

  chart: Chart;
  data: any[] = []; // Almacena los datos obtenidos
  monthNames: string[] = [
    'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
    'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
  ]; // Nombres de los meses

  constructor(private casaService: CasaService) { } // Inyectar el servicio

  ngOnInit(): void {
    this.obtenerDatosPorMes(); // Llama al método al inicializar el componente
  }

  ngAfterViewInit() {
    // Crear gráfico se moverá a después de obtener los datos
  }

  obtenerDatosPorMes() {
    this.casaService.getCasasPorMes().subscribe(
      (response) => {
        this.data = response; // Almacena la respuesta
        this.crearGrafico(); // Crea el gráfico con los datos obtenidos
      },
      (error) => {
        console.error('Error al obtener los datos:', error); // Manejo de errores
      }
    );
  }

  crearGrafico() {
    const ctx = (document.getElementById('myChart') as HTMLCanvasElement).getContext('2d');

    // Extraer etiquetas y datos del array response
    const labels = this.data.map(item => {
      const year = item[0]; // Obtiene el año
      const month = item[1]; // Obtiene el mes
      return `${this.monthNames[month - 1]} ${year}`; // Devuelve el nombre del mes y el año
    });

    const datasetData = this.data.map(item => item[2]); // Obtiene el total de alquileres

    this.chart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: labels, // Etiquetas del gráfico
        datasets: [{
          label: 'Total Alquileres por Mes', // Etiqueta para el conjunto de datos
          data: datasetData, // Datos para el gráfico
          backgroundColor: '#36A2EB', // Color de fondo
          borderColor: '#36A2EB', // Color del borde
          borderWidth: 1 // Ancho del borde de las barras
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          y: {
            beginAtZero: true
          }
        },
        legend: {
          position: 'top',
        },
      }
    });
  }
}
