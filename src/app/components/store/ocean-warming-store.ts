import { inject, Injectable, signal } from "@angular/core";
import { catchError, of, take } from "rxjs";
import { DataService } from "../../services/data.service";

@Injectable({ providedIn: "root" })
export class OceanWarmingDataStore {
  private readonly state = {
    $oceanWarming: signal<any>([]),
    $loading: signal<boolean>(false),
  } as const;

  public readonly $oceanWarming = this.state.$oceanWarming.asReadonly();
  private readonly dataService = inject(DataService);

  constructor() {
    this.oceanWarmingEffect();
  }

  oceanWarmingEffect() {
    this.state.$loading.set(true);
    this.dataService
      .getOceanWarmingData()
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
          this.state.$oceanWarming.set(data);
        }
        this.state.$loading.set(false);
      });
  }
}
