import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgChartsModule } from 'ng2-charts';
import { ChartData } from 'chart.js';

@Component({
  selector: 'app-chart',
  standalone: true,
  imports: [CommonModule, NgChartsModule],
  templateUrl: './chart.html',
  styleUrl: './chart.css'
})
export class ChartComponent implements OnChanges {
  @Input() data: { [state: string]: number } = {};

  pieChartData: ChartData<'pie', number[], string> = {
    labels: [],
    datasets: [{ data: [] }]
  };

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['data'] && this.data) {
      this.updateChartData();
    }
  }

  updateChartData(): void {
    this.pieChartData = {
      labels: Object.keys(this.data),
      datasets: [
        {
          data: Object.values(this.data),
          backgroundColor: [
            '#42A5F5', // blue
            '#66BB6A', // green
            '#FFA726', // orange
            '#EF5350', // red
            '#AB47BC', // purple
            '#FFCA28', // yellow
          ]
        }
      ]
    };
  }

 pieChartOptions = {
   responsive: true,
   plugins: {
     legend: {
       position: 'right' as const
     }
   }
 };

}
