import {Directive, ElementRef, HostListener, Input} from '@angular/core';

@Directive({
  selector: 'img[appImageFallback]'
})
export class ImageFallbackDirective {
  @Input() appImageFallback: string = 'https://via.placeholder.com/200';
  constructor(private elementRef: ElementRef) {

  }
  @HostListener('error')
  loadFallbackOnError() {
    const element: HTMLImageElement = <HTMLImageElement> this.elementRef.nativeElement;

    element.src = this.appImageFallback;
  }

}
