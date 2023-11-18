import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-carbon-dioxide',
  standalone: true,
  imports: [CommonModule, NgxChartsModule],
  templateUrl: './carbon-dioxide.component.html',
  styleUrl: './carbon-dioxide.component.scss',
})
export class CarbonDioxideComponent {
  
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

  colorScheme = {
    domain: ['#5AA454', '#E44D25', '#CFC0BB', '#7aa3e5', '#a8385d', '#aae3f5'],
  };

  constructor(private dataService: DataService) {
    this.dataService.getData().subscribe(res => {
      console.log(res);
    })
    this.dataService.getCo2Data().subscribe(res => {
      this.data = res;
    })
  }
  
  onSelect(event: any) {
    console.log(event);
  }
}
