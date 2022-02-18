import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AlbumUploadComponent} from "./pages/album-upload/album-upload.component";

const routes: Routes = [{
  path: '',
  component: AlbumUploadComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UploadRoutingModule { }
