import { inject, Injectable, signal } from "@angular/core";
import { catchError, of, take } from "rxjs";
import { DataService } from "../../services/data.service";

@Injectable({ providedIn: "root" })
export class ForestCarbonDataStore {
  private readonly state = {
    $forestCarbon: signal<any>([]),
    $loading: signal<boolean>(false),
  } as const;

  public readonly $forestCarbon = this.state.$forestCarbon.asReadonly();
  private readonly dataService = inject(DataService);

  constructor() {
    this.forestCarbonEffect();
  }

  forestCarbonEffect() {
    this.state.$loading.set(true);
    this.dataService
      .getForestAndCarbonData()
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
          this.state.$forestCarbon.set(data);
        }
        this.state.$loading.set(false);
      });
  }
}
