import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AlbumExplorerComponent} from "./pages/album-explorer/album-explorer.component";

const routes: Routes = [{
  path: '', component: AlbumExplorerComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ExplorerRoutingModule { }
