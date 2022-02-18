import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {DragAndDropDirective} from "../../core/directives/drag-and-drop.directive";
import {ImageFallbackDirective} from "../../core/directives/image-fallback.directive";

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [DragAndDropDirective, ImageFallbackDirective],
  exports: [DragAndDropDirective, ImageFallbackDirective],
})
export class DirectivesModule { }
