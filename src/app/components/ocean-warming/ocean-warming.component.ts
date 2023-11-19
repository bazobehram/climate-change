import { Component, inject } from "@angular/core";
import { CommonModule } from "@angular/common";
import { NgxChartsModule } from "@swimlane/ngx-charts";
import { DataService } from "../../services/data.service";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { OceanWarmingDataStore } from "../store/ocean-warming-store";

@Component({
  selector: "app-ocean-warming",
  standalone: true,
  imports: [NgxChartsModule, MatProgressSpinnerModule],
  providers: [OceanWarmingDataStore, DataService],
  templateUrl: "./ocean-warming.component.html",
  styleUrl: "./ocean-warming.component.scss",
})
export class OceanWarmingComponent {
  readonly dataStore = inject(OceanWarmingDataStore);
}
