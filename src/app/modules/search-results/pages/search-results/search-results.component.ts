import {Component, Input, OnInit} from '@angular/core';
import {SearchResults} from "../../models/search-results";
import {SearchService} from "../../../../core/services/search/search.service";
import {ActivatedRoute, Router} from "@angular/router";
import {mergeMap} from "rxjs/operators";

@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.scss']
})
export class SearchResultsComponent implements OnInit {
  PAGE_COUNT: number = 10;
  currentPage: number = 0;

  noAlbums: boolean = true;
  noSongs: boolean = true;

  @Input() dataSource: SearchResults;

  constructor(private searchService: SearchService,
              private route: ActivatedRoute,
              private router: Router
              ) {
    this.dataSource = {
      query: "",
      results: {
        albums: [],
        songs: []
      },
      albumEntries: 0,
      songEntries: 0
    }

  }

  ngOnInit(): void {

      this.route.params.pipe(mergeMap((v: any, index) => {
        let searchQuery = atob(v['searchQueryBase64']);

        return this.searchService.getSearchResults(searchQuery, this.PAGE_COUNT, this.currentPage);
      })).subscribe(data => {
        this.dataSource = data;
        this.noAlbums = data.albumEntries == 0;
        this.noSongs = data.songEntries == 0;
      });

    }

  navigateToAlbum(id: string) {
      this.router.navigate(['album', id]);
  }

  navigateToSong(id: string) {
    this.router.navigate(['song', id]);
  }
}
