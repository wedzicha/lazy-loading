import { Directive, ElementRef, EventEmitter, HostListener, Input, OnInit, Output } from '@angular/core';

@Directive({
  selector: '[appImageLoader]',
})
export class ImageLoaderDirective implements OnInit {
  @Input()
  public imageURL: string;

  @Output()
  public lodadComplete = new EventEmitter<void>();

  @HostListener('load')
  public onLoad(): void {
    this.lodadComplete.emit();
  }

  constructor(private element: ElementRef) {}

  public ngOnInit(): void {
    this.setImageUrlDestination();
  }

  private setElementBackground() {
    this.element.nativeElement.style.background = `url('${this.imageURL}') no-repeat 50% 50%`;
  }

  private setImageUrlDestination(): void {
    if (this.element.nativeElement.nodeName !== 'IMG') {
      this.setElementBackground();
    }
  }
}
