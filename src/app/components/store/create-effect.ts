import { isObservable, Observable, of, retry, Subject, Subscription } from 'rxjs';
import { takeUntilDestroyed as origTakeUntilDestroyed } from '@angular/core/rxjs-interop';
import { DestroyRef as OrigDestroyRef, inject as origInject } from '@angular/core';

export function createEffect<ObsvType>(
  gen: (orig$: Observable<ObsvType>) => Observable<unknown>
): (obsOrVal?: ObsvType | Observable<ObsvType>) => Subscription {
  const destroyRef = origInject(OrigDestroyRef);
  const orig$ = new Subject<ObsvType>();

  gen(orig$).pipe(
    retry(),
    origTakeUntilDestroyed(destroyRef)
  ).subscribe();

  return (obsOrVal?: ObsvType | Observable<ObsvType>): Subscription => {
    const obs$ = isObservable(obsOrVal)
      ? obsOrVal
      : of(obsOrVal);

    return obs$.pipe(
      origTakeUntilDestroyed(destroyRef)
    ).subscribe((val) => {
      orig$.next(val!);
    });
  };
}
