import { computed, inject, Injectable, signal } from "@angular/core";
import { createEffect } from "./create-effect";
import { catchError, defer, finalize, from, of, tap } from "rxjs";
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

  private carbonDioxideEffect = createEffect((_) =>
    defer(() => {
      this.state.$loading.set(true);
      return from(this.dataService.getCarbonDioxideData()).pipe(
        tap((data) => this.state.$carbonDioxide.set(data)),
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
