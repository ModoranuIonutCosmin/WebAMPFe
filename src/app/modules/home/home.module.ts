import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { LatestNewsPageComponent } from './pages/latest-news-page/latest-news-page.component';
import { NewsComponent } from './components/news/news.component';
import {NbCardModule, NbListModule} from "@nebular/theme";
import {NewsService} from "../../core/services/news/news.service";
import { NewsPlaceholderComponent } from './components/news-placeholder/news-placeholder.component';


@NgModule({
  declarations: [
    LatestNewsPageComponent,
    NewsComponent,
    NewsPlaceholderComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    NbListModule,
    NbCardModule,
  ],
  providers: [
    NewsService
  ]
})
export class HomeModule { }
