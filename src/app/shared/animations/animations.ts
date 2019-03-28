import {
  animate,
  AnimationTriggerMetadata,
  style,
  transition,
  trigger
} from '@angular/animations';

export class Animations {

  public static fadeInAnimation: AnimationTriggerMetadata[] = [
    trigger('fadeIn', [
      transition(':enter', [style({ opacity: 0 }), animate('300ms 300ms linear', style({ opacity: 1 }))]),
    ]),
  ];
}
