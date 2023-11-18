import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-forest-carbon',
  standalone: true,
  imports: [CommonModule, NgxChartsModule],
  templateUrl: './forest-carbon.component.html',
  styleUrl: './forest-carbon.component.scss'
})
export class ForestCarbonComponent {
  view: [number, number] = [1000, 700];
  data: any = [];
  // options
  legend: boolean = true;
  showLabels: boolean = true;
  animations: boolean = true;
  xAxis: boolean = true;
  yAxis: boolean = true;
  showYAxisLabel: boolean = true;
  showXAxisLabel: boolean = true;
  xAxisLabel: string = 'Year';
  yAxisLabel: string = 'Population';
  timeline: boolean = true;
  constructor(private dataService: DataService) {
    this.dataService.getForestAndCarbonData().subscribe(res => {
      console.log(res);
      this.data = res;
    })
  }
}
