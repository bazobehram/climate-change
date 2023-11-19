import { AfterViewInit, Component, inject } from "@angular/core";
import { FooterComponent } from "../footer/footer.component";
import { HeaderComponent } from "../header/header.component";
import { MatGridListModule } from "@angular/material/grid-list";
import { MatTabsModule } from "@angular/material/tabs";
import { DataService } from "../../services/data.service";
import { TemperatureComponent } from "../temperature/temperature.component";
import { CarbonDioxideComponent } from "../carbon-dioxide/carbon-dioxide.component";
import { ForestCarbonComponent } from "../forest-carbon/forest-carbon.component";
import { NitrouxOxideComponent } from "../nitroux-oxide/nitroux-oxide.component";
import { PolarIceCapsComponent } from "../polar-ice-caps/polar-ice-caps.component";
import { OceanWarmingComponent } from "../ocean-warming/ocean-warming.component";
import {
  trigger,
  state,
  style,
  animate,
  transition,
} from "@angular/animations";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { take } from "rxjs";
@Component({
  selector: "app-home",
  standalone: true,
  templateUrl: "./home.component.html",
  styleUrl: "./home.component.scss",
  providers: [DataService],
  animations: [
    trigger("typeWritterEffect", [
      state("void", style({ opacity: 0 })),
      state("*", style({ opacity: 1 })),
      transition("void => *", [animate("0.5s 0.5s ease-in")]),
      transition("* => void", [animate("0.5s ease-in")]),
    ]),
  ],
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
    MatProgressSpinnerModule,
  ],
})
export class HomeComponent implements AfterViewInit {
  dataService = inject(DataService);
  public response!: string | null;

  constructor() {
    this.askGemini(0);
  }

  matChange(index: any) {
    this.response = null;
    this.askGemini(index);
  }

  askGemini(index: number) {
    let prompt!: string;
    switch (index) {
      case 1:
        prompt = `
        Topic: Carbon dioxide concentration
        Information: Provide information about the amount of carbon dioxide concentration in the atmosphere over time and the trends and uncertainty in the data
        Requirements: Answer has to be in Turkish language,
        answer must not exceed 1000 characters,
        must be line by line,
        don't explain beside Climate Change Topic
      `;
        break;
      case 2:
        prompt = `
          Topic: Carbon stored in forest cover and forests over time
          Information: Provide information about the amount of carbon stored in forest cover and forests over time and the trends and uncertainty in the data
          Requirements: Answer has to be in Turkish language,
          answer must not exceed 1000 characters,
          must be line by line,
          don't explain beside Climate Change Topic
        `;
        break;
      case 3:
        prompt = `
            Topic: Nitrous oxide concentration
            Information: Provide information about atmospheric nitrous oxide concentration over time and trends and uncertainty in the data.
            Requirements: Answer has to be in Turkish language,
            answer must not exceed 1000 characters,
            must be line by line,
            don't explain beside Climate Change Topic
          `;
        break;
      case 4:
        prompt = `
              Topic: Arctic sea ice
              Information: Provide information about Extent and extent of Arctic sea ice over time, as well as trends and uncertainty in the data.
              Requirements: Answer has to be in Turkish language,
              answer must not exceed 1000 characters,
              must be line by line,
              don't explain beside Climate Change Topic
            `;
        break;
      case 5:
        prompt = `
              Topic: Global ocean temperature
              Information: Provide information about average global ocean temperature over time and trends and uncertainty in the data.
              Requirements: Answer has to be in Turkish language,
              answer must not exceed 1000 characters,
              must be line by line,
              don't explain beside Climate Change Topic
            `;
        break;

      default:
        prompt = `
        Topic: Global Climate Change
        Information: Provide information about the average global temperature over time and trends and uncertainties in the data
        Requirements: Answer has to be in Turkish language,
        answer must not exceed 1000 characters,
        must be line by line,
        don't explain beside Climate Change Topic
      `;
        break;
    }

    this.dataService.generateContentWithGeminiPro(prompt).then((res: any) => {
      this.response = this.formatGeminiText(res);
    });
  }

  formatGeminiText(geminiText: string): string {
    const lines = geminiText.split("\n");
    let formattedText = "";

    lines.forEach((line) => {
      if (line.startsWith("*")) {
        formattedText += "<br><br>" + line.substring(2);
      } else {
        formattedText += "<br><br>" + line;
      }
    });

    return formattedText.trim();
  }

  ngAfterViewInit() {}
}
