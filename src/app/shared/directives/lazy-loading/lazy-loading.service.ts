import { Subject, Observable } from 'rxjs';

export class LazyLoadingService {
  private onOffsetAchieve$ = new Subject<void>();

  public get newALazyLoadingOffsetEvent$(): Observable<void> {
    return this.onOffsetAchieve$.asObservable();
  }

  public pushLazyLoadingOffsetEvent(): void {
    this.onOffsetAchieve$.next();
  }
}
