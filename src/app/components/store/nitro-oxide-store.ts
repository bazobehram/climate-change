import { inject, Injectable, signal } from "@angular/core";
import { catchError, of, take } from "rxjs";
import { DataService } from "../../services/data.service";

@Injectable({ providedIn: "root" })
export class NitroOxideDataStore {
  private readonly state = {
    $nitroOxide: signal<any>([]),
    $loading: signal<boolean>(false),
  } as const;

  public readonly $nitroOxide = this.state.$nitroOxide.asReadonly();
  private readonly dataService = inject(DataService);

  constructor() {
    this.temperatureEffect();
  }

  temperatureEffect() {
    this.state.$loading.set(true);
    this.dataService
      .getNitrousOxideData()
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
          this.state.$nitroOxide.set(data);
        }
        this.state.$loading.set(false);
      });
  }
}
