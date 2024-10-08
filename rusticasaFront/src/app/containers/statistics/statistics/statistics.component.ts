import { AfterViewInit, Component, OnInit } from '@angular/core';
import * as Chart from 'chart.js';


@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.scss']
})
export class StatisticsComponent implements OnInit,AfterViewInit {

  chart: Chart;

  constructor() { }

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    const ctx = (document.getElementById('myChart') as HTMLCanvasElement).getContext('2d');
    this.chart = new Chart(ctx, {
      type: 'bar', // Cambiar a 'bar' para un gráfico de barras
      data: {
        labels: ['Red', 'Blue', 'Yellow'], // Etiquetas en el eje X
        datasets: [{
          label: 'Dataset 1', // Etiqueta para el conjunto de datos
          data: [300, 50, 100], // Datos para el gráfico
          backgroundColor: [
            '#FF6384',
            '#36A2EB',
            '#FFCE56',
          ],
          borderColor: [
            '#FF6384',
            '#36A2EB',
            '#FFCE56',
          ],
          borderWidth: 1 // Ancho del borde de las barras
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false, // Permite al gráfico adaptarse al tamaño del canvas
        scales: {
          y: {
            beginAtZero: true // Comenzar el eje Y en cero
          }
        },
        legend: {
          position: 'top',
        },
      }
    });
  }


}
