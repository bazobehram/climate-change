import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FooterComponent } from '../footer/footer.component';
import { HeaderComponent } from '../header/header.component';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatTabsModule } from '@angular/material/tabs';
import { DataService } from '../../services/data.service';
import { TemperatureComponent } from "../temperature/temperature.component";
import { CarbonDioxideComponent } from "../carbon-dioxide/carbon-dioxide.component";
import { ForestCarbonComponent } from "../forest-carbon/forest-carbon.component";


@Component({
    selector: 'app-home',
    standalone: true,
    templateUrl: './home.component.html',
    styleUrl: './home.component.scss',
    providers: [
        DataService
    ],
    imports: [
        CommonModule,
        FooterComponent,
        HeaderComponent,
        MatGridListModule,
        MatTabsModule,
        TemperatureComponent,
        CarbonDioxideComponent,
        ForestCarbonComponent
    ]
})
export class HomeComponent {
 
}
