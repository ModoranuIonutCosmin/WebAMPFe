import {Directive, EventEmitter, HostBinding, HostListener, Output} from '@angular/core';

@Directive({
  selector: '[appDragAndDrop]'
})
export class DragAndDropDirective {
  @Output() filesDropped: EventEmitter<any> = new EventEmitter<any>();

  @HostBinding('class.fileover') fileOver: boolean = false;
  @HostListener ('dragover', ['$event']) onDragOver(event: Event) {
    event.preventDefault();
    event.stopPropagation();
    this.fileOver = true;
    console.log('S-a tras peste!');
  }

  @HostListener ('dragleave', ['$event']) onDragLeave(event: Event) {
    event.preventDefault();
    event.stopPropagation();
    this.fileOver = false;
    console.log('S-a tras afara!');
  }

  @HostListener ('drop', ['$event']) onDrop(event: any) {
    event.preventDefault();
    event.stopPropagation();
    let files = event.dataTransfer.files;
    this.fileOver = false;
    console.log(files);
    if (files.length > 0) {
      this.filesDropped.emit(files);
    }
  }
  constructor() { }

}
