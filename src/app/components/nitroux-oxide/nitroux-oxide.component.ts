import { Component, inject } from "@angular/core";
import { DataService } from "../../services/data.service";
import { NgxChartsModule } from "@swimlane/ngx-charts";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { NitroOxideDataStore } from "../store/nitro-oxide-store";

@Component({
  selector: "app-nitroux-oxide",
  standalone: true,
  imports: [NgxChartsModule, MatProgressSpinnerModule],
  providers: [NitroOxideDataStore, DataService],
  templateUrl: "./nitroux-oxide.component.html",
  styleUrl: "./nitroux-oxide.component.scss",
})
export class NitrouxOxideComponent {
  readonly dataStore = inject(NitroOxideDataStore);
}
