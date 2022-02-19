import {Component, EventEmitter, HostListener, OnInit, Output, ViewChild} from '@angular/core';
import {Router} from "@angular/router";
import {SearchService} from "../../../core/services/search/search.service";
import {SearchResult} from "../../models/search-result";
import {Subject, timer} from "rxjs";

@Component({
  selector: 'app-searchbar',
  templateUrl: './searchbar.component.html',
  styleUrls: ['./searchbar.component.scss']
})
export class SearchbarComponent {
  @ViewChild('searchInput') searchInput!: HTMLInputElement;
  searchBarInput: string = "";
  suggestions: Array<SearchResult> = []
  suggestionsMax: number = 5;

  dropdownVisible: boolean = false;
  clickedOutside: boolean = false;

  @Output() searchEvent: EventEmitter<string> = new EventEmitter<string>();

  currentSearchTerm$: Subject<string> = new Subject<string>()

  @HostListener('click')
  clickInside() {
    this.clickedOutside = false;
    console.log('Clicked inside');

  }

  @HostListener('document:click')
  clickout() {
    if (this.clickedOutside) {
      console.log('Clicked outside');
      this.dropdownVisible = false;
    }
    this.clickedOutside = true;
  }

  constructor(private router: Router,
              private searchService: SearchService) {
    this.searchService.search(this.currentSearchTerm$, this.suggestionsMax)
      .subscribe(searchResult => {

        console.log(searchResult);
        this.suggestions = [];
        this.suggestions = searchResult.results.albums
          .slice(0, 5).map((album, index) => {
            return {
              info: album,
              type: 'album'
            }
          });
        let suggestionsCount = this.suggestions.length;
        console.log(suggestionsCount);
        if (suggestionsCount < this.suggestionsMax) {
          this.suggestions = this.suggestions.concat(
            searchResult.results.songs
              .slice(0, this.suggestionsMax - suggestionsCount)
              .map((song, index) => {
                return {
                  info: song,
                  type: 'song'
                }
              }));
        }
      })
  }

  onSearchTermChange(event: any) {
    this.dropdownVisible = true;
    this.currentSearchTerm$.next(event.target.value);
  }

  search() {
    if (this.searchBarInput && this.searchBarInput.trim()) {
      this.router.navigate(['search', `${btoa(this.searchBarInput)}`]);
      this.dropdownVisible = false;
      this.searchEvent.next('searched');
    }
  }

  openSearchSuggestions(searchResult: SearchResult): void {
    this.searchEvent.next('searched');

    if (searchResult.type == 'album') {
      this.router.navigate(['/album/', searchResult.info.id]);
    } else {
      this.router.navigate(['/song/', searchResult.info.id])
    }

    this.dropdownVisible = false;
    this.searchInput.value = '';
  }


}
