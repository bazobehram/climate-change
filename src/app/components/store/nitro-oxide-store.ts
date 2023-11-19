import { inject, Injectable, signal } from "@angular/core";
import { createEffect } from "./create-effect";
import { catchError, defer, finalize, from, of, tap } from "rxjs";
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

  private temperatureEffect = createEffect((_) =>
    defer(() => {
      this.state.$loading.set(true);
      return from(this.dataService.getNitrousOxideData()).pipe(
        tap((data) => this.state.$nitroOxide.set(data)),
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
