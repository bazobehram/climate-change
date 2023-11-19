import { inject, Injectable, signal } from "@angular/core";
import { createEffect } from "./create-effect";
import { catchError, defer, finalize, from, of, tap } from "rxjs";
import { DataService } from "../../services/data.service";

@Injectable({ providedIn: "root" })
export class PolarIceCapsDataStore {
  private readonly state = {
    $polarIceCaps: signal<any>([]),
    $loading: signal<boolean>(false),
  } as const;

  public readonly $polarIceCaps = this.state.$polarIceCaps.asReadonly();
  private readonly dataService = inject(DataService);

  constructor() {
    this.temperatureEffect();
  }

  private temperatureEffect = createEffect((_) =>
    defer(() => {
      this.state.$loading.set(true);
      return from(this.dataService.getNitrousOxideData()).pipe(
        tap((data) => this.state.$polarIceCaps.set(data)),
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
