import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AlbumRoutingModule } from './album-routing.module';
import { AlbumDetailsPage } from './pages/album-details/album-details-page.component';
import { AlbumInfoPanelComponent } from './components/album-info-panel/album-info-panel.component';
import {AlbumService} from "../../core/services/media/album/album.service";
import {NbButtonModule, NbIconModule} from "@nebular/theme";
import {SharedModule} from "../../shared/shared.module";
import {FavoritesService} from "../../core/services/favorites/favorites.service";
import {DirectivesModule} from "../directives/directives.module";


@NgModule({
    declarations: [
        AlbumDetailsPage,
        AlbumInfoPanelComponent
    ],
    imports: [
        CommonModule,
        AlbumRoutingModule,
        NbIconModule,
        NbButtonModule,
        SharedModule,
        DirectivesModule
    ],
    providers: [AlbumService, FavoritesService]
})
export class AlbumModule { }
