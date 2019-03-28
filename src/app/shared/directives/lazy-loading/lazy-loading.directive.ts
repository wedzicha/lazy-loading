import { Directive, ElementRef, NgZone, OnDestroy, OnInit } from '@angular/core';
import { fromEvent, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { LazyLoadingService } from './lazy-loading.service';

@Directive({
  selector: '[appLazyLoading]'
})
export class LazyLoadingDirective implements OnInit, OnDestroy {
  private ngUnsubscribe$ = new Subject<void>();
  private currentElementHeight: number;
  private readonly offsetScroll = 200;

  constructor(private listElement: ElementRef,
              private ngZone: NgZone,
              private lazyLoadingService: LazyLoadingService) {
  }

  public ngOnInit(): void {
    this.addListLitener();
    this.currentElementHeight = this.listElement.nativeElement.clientHeight;
  }

  public ngOnDestroy(): void {
    this.ngUnsubscribe$.next();
    this.ngUnsubscribe$.complete();
  }

  private addListLitener(): void {
    this.ngZone.runOutsideAngular(() => {
      fromEvent(this.listElement.nativeElement, 'scroll')
        .pipe(takeUntil(this.ngUnsubscribe$))
        .subscribe(() => {
          this.checkOffsetPosition();
        });
    });
  }

  private checkOffsetPosition(): void {
    if (this.ifOffsetAchieved()) {
      this.ngZone.run(() => {
        this.updateElementHeight();
        this.lazyLoadingService.pushLazyLoadingOffsetEvent();
      });
    }
  }

  private updateElementHeight(): void {
    this.currentElementHeight = this.listElement.nativeElement.scrollHeight;
  }

  private ifOffsetAchieved(): boolean {
    return this.listElement.nativeElement.scrollTop
      >= this.currentElementHeight - this.offsetScroll;
  }
}
