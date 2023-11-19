import { Component, inject } from "@angular/core";
import { NgxChartsModule } from "@swimlane/ngx-charts";
import { DataService } from "../../services/data.service";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { ForestCarbonDataStore } from "../store/forest-carbon-store";

@Component({
  selector: "app-forest-carbon",
  standalone: true,
  imports: [NgxChartsModule, MatProgressSpinnerModule],
  providers: [ForestCarbonDataStore, DataService],
  templateUrl: "./forest-carbon.component.html",
  styleUrl: "./forest-carbon.component.scss",
})
export class ForestCarbonComponent {
  readonly dataStore = inject(ForestCarbonDataStore);
}
