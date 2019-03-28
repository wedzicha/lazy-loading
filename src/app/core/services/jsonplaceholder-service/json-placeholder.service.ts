import { Injectable } from '@angular/core';
import { ajax } from 'rxjs/ajax';
import { Observable, EMPTY } from 'rxjs';
import { IPhotosList } from '../../../components/photos-list/photos-list.component';
import { HttpErrorResponse } from '@angular/common/http';
import { catchError } from 'rxjs/operators';

@Injectable()
export class JsonPlaceholderService {
  public getPhotosListResult(offset: number): Observable<ReadonlyArray<IPhotosList>> {
    return ajax.getJSON(`https://jsonplaceholder.typicode.com/albums/1/photos?_limit=${offset}`)
      .pipe(catchError((error) => this.handleRequestError(error))) as Observable<never>;
  }

  private handleRequestError(error: HttpErrorResponse): Observable<never> {
    console.log('Can not get results:', error);

    return EMPTY;
  }
}

