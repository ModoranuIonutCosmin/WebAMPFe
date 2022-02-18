import { Component, OnInit } from '@angular/core';
import {AlbumInfo} from "../../../album/models/album-info";
import {FilterOptionsModel} from "../../models/filter-options-model";
import {AlbumService} from "../../../../core/services/media/album/album.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-album-details',
  templateUrl: './album-explorer.component.html',
  styleUrls: ['./album-explorer.component.scss']
})
export class AlbumExplorerComponent implements OnInit {
  throttle = 200;
  distance = 2;
  page = 0;
  count = 15;
  totalLoaded = 0;
  totalAlbumsCount = 0;
  albums: AlbumInfo[] = [];
  filterOptions: FilterOptionsModel = {
    selectedSortCriteria: 'dateAdded',
    sortOrder: 'desc'
  }

  constructor(private albumsService: AlbumService,
              private router: Router) { }

  ngOnInit(): void {
    this.loadFirstPage();
  }
  loadFirstPage(): void {
    this.albumsService
      .getAlbumsListPaginated(this.page++, this.count, this.filterOptions.selectedSortCriteria,
        this.filterOptions.sortOrder)
      .subscribe(result => {
        this.albums = result.albums;
        this.totalLoaded += this.count;
        this.totalAlbumsCount = result.totalAlbumsCount;
      });
  }

  onScroll() {
    if (this.totalAlbumsCount < this.totalLoaded) {
      return;
    }

    this.albumsService
      .getAlbumsListPaginated(++this.page, this.count, this.filterOptions.selectedSortCriteria,
        this.filterOptions.sortOrder)
      .subscribe(result => {
        this.albums.push(...result.albums)
        this.totalLoaded += this.count;
      });
  }

  filterChanged(filterOptions: FilterOptionsModel) {
    this.page = 0;
    this.albums = [];
    this.totalLoaded = 0;
    this.filterOptions = filterOptions;
    this.loadFirstPage();
  }

  navigateToAlbum(album: AlbumInfo) {
    this.router.navigate(['/album', album.id]);
  }
}
