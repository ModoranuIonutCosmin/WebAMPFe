import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {SearchResults} from "../../../modules/search-results/models/search-results";
import {environment} from "../../../../environments/environment";
import {ApiPaths} from "../../../../environments/apiPaths";
import {debounceTime, distinctUntilChanged, switchMap} from "rxjs/operators";

@Injectable()
export class SearchService {

  constructor(private httpClient: HttpClient,
              ) {

  }

  search(terms: Observable<string>, maxEntries: number): Observable<SearchResults> {
    return terms.pipe(debounceTime(400), distinctUntilChanged(),
      switchMap(term => this.getSearchResults(term, maxEntries, 0)));
  }

  public getSearchResults(query: string, count: number, page: number) : Observable<SearchResults> {
    return this.httpClient
      .get<SearchResults>(environment.baseUrl + ApiPaths.searchResultsGet + `?query=${query}&count=${count}&page=${page}`);
  }
}
