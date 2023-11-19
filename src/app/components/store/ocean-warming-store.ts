import { inject, Injectable, signal } from "@angular/core";
import { createEffect } from "./create-effect";
import { catchError, defer, finalize, from, of, tap } from "rxjs";
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

  private oceanWarmingEffect = createEffect((_) =>
    defer(() => {
      this.state.$loading.set(true);
      return from(this.dataService.getOceanWarmingData()).pipe(
        tap((data) => this.state.$oceanWarming.set(data)),
        catchError((error) => {
          console.error("Error fetching CO2 data:", error);
          this.state.$loading.set(false);
          return of(null);
        }),
        finalize(() => this.state.$loading.set(false))
      );
    })
  );
}
