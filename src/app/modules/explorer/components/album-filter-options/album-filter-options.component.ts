import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {FilterOptionsModel} from "../../models/filter-options-model";

@Component({
  selector: 'app-album-filter-options',
  templateUrl: './album-filter-options.component.html',
  styleUrls: ['./album-filter-options.component.scss']
})
export class AlbumFilterOptionsComponent implements OnInit {
  selectedSortCriteria: string;
  sortOrder: string;
  @Output() filterCriteriaChanged: EventEmitter<FilterOptionsModel>
    = new EventEmitter<FilterOptionsModel>();

  constructor(private route: ActivatedRoute) {
    this.selectedSortCriteria = 'dateAdded';
    this.sortOrder = 'desc';
  }

  ngOnInit(): void {
    this.route.queryParams
      .subscribe(params => {
          if (params['cr'] && (params['cr'] == 'dateAdded' || params['cr'] == 'popular')) {
            this.selectedSortCriteria = params['cr'];
          }
          if (params['so'] && (params['so'] == 'asc' || params['so'] == 'desc')) {
            this.sortOrder = params['so'];
          }

          this.optionsChanged();
        });
  }

  optionsChanged() {
    this.filterCriteriaChanged.next({
      sortOrder: this.sortOrder,
      selectedSortCriteria: this.selectedSortCriteria
    })
  }
}
