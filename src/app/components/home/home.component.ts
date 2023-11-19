import { Component, Inject, WritableSignal, signal } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FooterComponent } from "../footer/footer.component";
import { HeaderComponent } from "../header/header.component";
import { MatGridListModule } from "@angular/material/grid-list";
import { MatTabChangeEvent, MatTabsModule } from "@angular/material/tabs";
import { DataService } from "../../services/data.service";
import { TemperatureComponent } from "../temperature/temperature.component";
import { CarbonDioxideComponent } from "../carbon-dioxide/carbon-dioxide.component";
import { ForestCarbonComponent } from "../forest-carbon/forest-carbon.component";
import { NitrouxOxideComponent } from "../nitroux-oxide/nitroux-oxide.component";
import { PolarIceCapsComponent } from "../polar-ice-caps/polar-ice-caps.component";
import { OceanWarmingComponent } from "../ocean-warming/ocean-warming.component";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";

@Component({
  selector: "app-home",
  standalone: true,
  templateUrl: "./home.component.html",
  styleUrl: "./home.component.scss",
  providers: [DataService],
  imports: [
    MatGridListModule,
    MatTabsModule,
    FooterComponent,
    HeaderComponent,
    TemperatureComponent,
    CarbonDioxideComponent,
    ForestCarbonComponent,
    NitrouxOxideComponent,
    PolarIceCapsComponent,
    OceanWarmingComponent,
  ],
})
export class HomeComponent {}
