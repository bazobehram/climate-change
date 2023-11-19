import { inject, Injectable, signal } from "@angular/core";
import { catchError, of, take } from "rxjs";
import { DataService } from "../../services/data.service";

@Injectable({ providedIn: "root" })
export class CarbonDioxideDataStore {
  private readonly state = {
    $carbonDioxide: signal<any>([]),
    $loading: signal<boolean>(false),
  } as const;

  public readonly $carbonDioxide = this.state.$carbonDioxide.asReadonly();
  private readonly dataService = inject(DataService);

  constructor() {
    this.carbonDioxideEffect();
  }

  carbonDioxideEffect() {
    this.state.$loading.set(true);
    this.dataService
      .getCarbonDioxideData()
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
          this.state.$carbonDioxide.set(data);
        }
        this.state.$loading.set(false);
      });
  }
}
