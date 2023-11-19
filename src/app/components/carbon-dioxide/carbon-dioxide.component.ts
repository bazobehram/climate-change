import { Component, inject } from "@angular/core";
import { NgxChartsModule } from "@swimlane/ngx-charts";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { DataService } from "../../services/data.service";
import { CarbonDioxideDataStore } from "../store/carbon-dioxide-store";

@Component({
  selector: "app-carbon-dioxide",
  standalone: true,
  imports: [NgxChartsModule, MatProgressSpinnerModule],
  providers: [CarbonDioxideDataStore, DataService],
  templateUrl: "./carbon-dioxide.component.html",
  styleUrl: "./carbon-dioxide.component.scss",
})
export class CarbonDioxideComponent {
  readonly dataStore = inject(CarbonDioxideDataStore);
}
