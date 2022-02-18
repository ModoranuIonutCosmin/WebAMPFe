import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SearchResultsRoutingModule } from './search-results-routing.module';
import {SearchResultsComponent} from "./pages/search-results/search-results.component";
import {SearchService} from "../../core/services/search/search.service";


@NgModule({
  declarations: [
    SearchResultsComponent
  ],
  imports: [
    CommonModule,
    SearchResultsRoutingModule
  ],
  providers: [SearchService]
})
export class SearchResultsModule { }
