import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {NewsPostsSummary} from "../../../modules/home/models/news-posts-summary";
import {environment} from "../../../../environments/environment";
import {ApiPaths} from "../../../../environments/apiPaths";

@Injectable()
export class NewsService {

  constructor(private httpClient: HttpClient) {

  }

  public loadNewsPosts(page: number, count: number): Observable<NewsPostsSummary> {
    return this.httpClient.get<NewsPostsSummary>(
      environment.baseUrl + ApiPaths.newsPosts + `?page=${page}&count=${count}`);
  }
}
