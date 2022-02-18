import {Component, OnDestroy, OnInit} from '@angular/core';
import {NewsPost} from "../../models/news-post";
import {NewsService} from "../../../../core/services/news/news.service";
import {SpinnerService} from "../../../../core/services/helpers/spinner.service";

@Component({
  selector: 'app-latest-news-page',
  templateUrl: './latest-news-page.component.html',
  styleUrls: ['./latest-news-page.component.scss']
})
export class LatestNewsPageComponent implements OnInit{
  newsPosts: Array<NewsPost> = [];
  pageSize = 1;
  pageToLoadNext = 0;
  loading = false;
  placeholders: any[] = [];
  totalPosts: number = 10;

  constructor(private newsService: NewsService,
              private spinnerService: SpinnerService) {
    console.log('new instance of home service')
  }

  ngOnInit(): void {
    this.loadNewPosts();
  }

  loadNext() {
    if (this.loading || this.pageToLoadNext >= this.totalPosts) {
      return
    }
    this.loadNewPosts();

    this.loading = true;
    this.placeholders = new Array(this.pageSize);

  }
  loadNewPosts(): void {
    this.spinnerService.isLoading$.next(true);
    this.newsService.loadNewsPosts(this.pageToLoadNext, this.pageSize)
      .subscribe(news => {
        this.placeholders = [];
        this.newsPosts.push(...news.news);
        this.loading = false;
        this.totalPosts = news.total;
        this.pageToLoadNext++;
        this.spinnerService.isLoading$.next(false);
      });
  }


}
