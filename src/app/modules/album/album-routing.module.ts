import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AlbumDetailsPage} from "./pages/album-details/album-details-page.component";

const routes: Routes = [{
  path: ':albumId',
  component: AlbumDetailsPage
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AlbumRoutingModule { }
