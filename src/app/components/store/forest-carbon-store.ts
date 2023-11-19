import { computed, inject, Injectable, signal } from "@angular/core";
import { createEffect } from "./create-effect";
import { catchError, defer, finalize, from, of, tap } from "rxjs";
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

  private forestCarbonEffect = createEffect((_) =>
    defer(() => {
      this.state.$loading.set(true);
      return from(this.dataService.getForestAndCarbonData()).pipe(
        tap((data) => this.state.$forestCarbon.set(data)),
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
