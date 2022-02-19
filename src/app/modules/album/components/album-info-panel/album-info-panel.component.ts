import {ChangeDetectorRef, Component, Input, OnChanges, SimpleChanges} from '@angular/core';
import {AlbumInfo} from "../../models/album-info";
import {FavoritesService} from "../../../../core/services/favorites/favorites.service";
import {ToastrHelpersService} from "../../../../core/services/helpers/toastr-helpers.service";
import {NbGlobalPhysicalPosition} from "@nebular/theme";

@Component({
  selector: 'app-album-info-panel',
  templateUrl: './album-info-panel.component.html',
  styleUrls: ['./album-info-panel.component.scss']
})
export class AlbumInfoPanelComponent implements OnChanges {

  @Input() dataSource!: AlbumInfo;
  albumId: string = "";
  isFavorite: boolean = false;
  initialized: boolean = false;

  constructor(private favoriteService: FavoritesService,
              private toastrService: ToastrHelpersService,
              private changeDetector: ChangeDetectorRef) {

  }


  ngOnChanges(changes: SimpleChanges): void {
    if (this.dataSource && !this.initialized) {
      this.albumId = this.dataSource.id || '';
      this.favoriteService
        .checkIfCurrentUserFavoritedAlbum(this.albumId)
        .subscribe(res => {
          this.isFavorite = res.isFavorite;
        });
      this.initialized = true;
    }

  }

  toggleFavorite(): void {
    if (!this.albumId) {
      return;
    }

    if (this.isFavorite) {
      this.favoriteService.deleteAlbumFromFavorites(this.albumId)
        .subscribe(res => {
            this.isFavorite = false;
            this.toastrService.showMessage(NbGlobalPhysicalPosition.BOTTOM_RIGHT, 'success', 'Album deleted from favorites')
          },
          err => {
            this.toastrService.showMessage(NbGlobalPhysicalPosition.BOTTOM_RIGHT, 'danger', 'Album deletion failed.')
          })
    } else {
      this.favoriteService.addAlbumToFavorites(this.albumId)
        .subscribe(res => {
          this.isFavorite = true;
          this.toastrService.showMessage(NbGlobalPhysicalPosition.BOTTOM_RIGHT, 'success', 'Album added to favorites')
        }, err => {
          this.toastrService.showMessage(NbGlobalPhysicalPosition.BOTTOM_RIGHT, 'danger', 'Album addition failed.')
        })
    }
  }


}
