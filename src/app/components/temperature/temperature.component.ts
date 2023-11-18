import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-temperature',
  standalone: true,
  imports: [CommonModule, NgxChartsModule],
  templateUrl: './temperature.component.html',
  styleUrl: './temperature.component.scss'
})
export class TemperatureComponent {
  temperatureData: any;
  

  view: [number, number] = [1000, 700];

  // Options
  showXAxis = true;
  showYAxis = true;
  gradient = false;
  showLegend = true;
  showXAxisLabel = true;
  xAxisLabel = 'Time';
  showYAxisLabel = true;
  yAxisLabel = 'Temperature Change';
  constructor(private dataService: DataService) {
    this.dataService.getTemperatureData().subscribe((res: any) => {
      this.temperatureData = this.transformData(res.features);
    })
  }

  transformData(rawData: any): any[] {
    // Convert data format here
    const transformedData = rawData.map((entry: any) => {
      const countryName = entry.attributes.Country;
      const series = Object.entries(entry.attributes)
        .filter(([key, value]) => key.startsWith('F') && value !== null)
        .map(([key, value]) => ({ name: key.substring(1), value }));

      return { name: countryName, series };
    });

    return transformedData;
  }
}
