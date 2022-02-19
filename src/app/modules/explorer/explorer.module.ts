import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ExplorerRoutingModule } from './explorer-routing.module';
import { AlbumFilterOptionsComponent } from './components/album-filter-options/album-filter-options.component';
import {NbButtonModule, NbCardModule, NbSelectModule} from "@nebular/theme";
import { AlbumExplorerComponent } from './pages/album-explorer/album-explorer.component';
import {InfiniteScrollModule} from "ngx-infinite-scroll";
import {DirectivesModule} from "../directives/directives.module";


@NgModule({
  declarations: [
    AlbumFilterOptionsComponent,
    AlbumExplorerComponent
  ],
  imports: [
    CommonModule,
    ExplorerRoutingModule,
    NbSelectModule,
    NbCardModule,
    NbButtonModule,
    InfiniteScrollModule,
    DirectivesModule
  ]
})
export class ExplorerModule { }
