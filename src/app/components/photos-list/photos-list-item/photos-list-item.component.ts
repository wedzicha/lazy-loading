import { Component, Input } from '@angular/core';
import { IPhotosList } from '../photos-list.component';
import { Animations } from '../../../shared/animations/animations';

@Component({
  selector: 'app-photos-list-item',
  templateUrl: './photos-list-item.component.html',
  styleUrls: ['./photos-list-item.component.sass'],
  animations: Animations.fadeInAnimation,
})
export class PhotosListItemComponent {
  @Input()
  public item: IPhotosList;

  public isImageLoading = true;

  public onImageLoad = (): void => {
    this.isImageLoading = false;
  }
}
