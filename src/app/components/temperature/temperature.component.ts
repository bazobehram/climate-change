import { OnInit } from '@angular/core';
import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { DataService } from '../../services/data.service';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { TemperatureDataStore } from '../store/temperature-store';

@Component({
  selector: 'app-temperature',
  standalone: true,
  imports: [NgxChartsModule, MatProgressSpinnerModule],
  providers: [TemperatureDataStore, DataService],
  templateUrl: './temperature.component.html',
  styleUrl: './temperature.component.scss'
})
export class TemperatureComponent {
  readonly dataStore = inject(TemperatureDataStore);
}
