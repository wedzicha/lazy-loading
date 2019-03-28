import { Component, ElementRef, EventEmitter, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { JsonPlaceholderService } from '../../core/services/jsonplaceholder-service/json-placeholder.service';
import { EMPTY, Observable } from 'rxjs';
import { catchError, takeUntil } from 'rxjs/operators';
import { LazyLoadingService } from '../../shared/directives/lazy-loading/lazy-loading.service';
import { HttpErrorResponse } from '@angular/common/http';

export interface IPhotosList {
  'albumId': number;
  'id': number;
  'title': string;
  'url': string;
  'thumbnailUrl': string;
}

@Component({
  selector: 'app-photos-list',
  templateUrl: './photos-list.component.html',
  styleUrls: ['./photos-list.component.sass'],
})
export class PhotosListComponent implements OnInit, OnDestroy {
  public photosList: ReadonlyArray<IPhotosList> = [];
  private currentOffset = 20;
  private ngUnsubscribe = new EventEmitter<void>();
  private readonly offsetListIterator = 10;

  @ViewChild('listElement')
  public listElement: ElementRef;

  constructor(private jsonPlaceholderService: JsonPlaceholderService,
              private lazyLoadingService: LazyLoadingService) {
  }

  public ngOnInit(): void {
    this.getPhotosList();
    this.lazyLoadingService.newALazyLoadingOffsetEvent$
      .pipe(
        catchError((error) => this.handleRequestError(error)),
        takeUntil(this.ngUnsubscribe))
      .subscribe(() => {
        this.loadMoreResults();
      });
  }

  public ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  public loadMoreResults(): void {
    this.currentOffset += this.offsetListIterator;
    this.getPhotosList();
  }

  public trackingFunction(index: number, item: IPhotosList): number {
    return item.id;
  }

  private getPhotosList(): void {
    this.jsonPlaceholderService.getPhotosListResult(this.currentOffset)
      .subscribe(photosList => {
        this.photosList = photosList;
      });
  }

  private handleRequestError(error: HttpErrorResponse): Observable<never> {
    console.log('Can not get offset event:', error);

    return EMPTY;
  }
}
