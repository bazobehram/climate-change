import { Component, inject } from "@angular/core";
import { CommonModule } from "@angular/common";
import { NgxChartsModule } from "@swimlane/ngx-charts";
import { DataService } from "../../services/data.service";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { PolarIceCapsDataStore } from "../store/polar-ice-caps-store";

@Component({
  selector: "app-polar-ice-caps",
  standalone: true,
  imports: [NgxChartsModule, MatProgressSpinnerModule],
  providers: [PolarIceCapsDataStore, DataService],
  templateUrl: "./polar-ice-caps.component.html",
  styleUrl: "./polar-ice-caps.component.scss",
})
export class PolarIceCapsComponent {
  readonly dataStore = inject(PolarIceCapsDataStore);
}
