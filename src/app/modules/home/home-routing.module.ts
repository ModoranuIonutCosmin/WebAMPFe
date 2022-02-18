import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LatestNewsPageComponent} from "./pages/latest-news-page/latest-news-page.component";

const routes: Routes = [{
  path: '', component: LatestNewsPageComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
