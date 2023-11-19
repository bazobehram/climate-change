import { inject, Injectable, signal } from "@angular/core";
import { DataService } from "../../services/data.service";
import { catchError, of, take } from "rxjs";

@Injectable({ providedIn: "root" })
export class TemperatureDataStore {
  private readonly state = {
    $temperature: signal<any>([]),
    $loading: signal<boolean>(false),
  } as const;

  public readonly $temperature = this.state.$temperature.asReadonly();
  private readonly dataService = inject(DataService);

  constructor() {
    this.temperatureEffect();
  }

  private temperatureEffect() {
    this.state.$loading.set(true);
    this.dataService
      .getTemperatureData()
      .pipe(
        take(1),
        catchError((error) => {
          console.error("Error fetching temperature data:", error);
          this.state.$loading.set(false);
          return of(null);
        })
      )
      .subscribe((data) => {
        if (data !== null) {
          this.state.$temperature.set(data);
        }
        this.state.$loading.set(false);
      });
  }
}
