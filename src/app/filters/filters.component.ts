import { Component, OnInit } from '@angular/core';

import { ActivityCategories } from '../record';
import { MetricNames } from '../record';

import { Filter } from '../filter';
import { FilterService } from '../filter.service';

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.css']
})
export class FiltersComponent implements OnInit {
  children = ['Bryan', 'Emily'];
  records: string[];
  selectedChildren: string[];
  selectedRecords: string[];

  constructor(private filterService: FilterService) {
  }

  ngOnInit() {
    this.records = ActivityCategories.slice(0).concat(MetricNames);
    this.selectedChildren = [];
    this.selectedRecords = [];
    this.updateFilter();
  }

  createFilterObj () {
    const filter = new Filter();
    filter.child = [];
    filter.activity = [];
    filter.metric = [];
    if (this.selectedChildren.length > 0) {
      filter.child = this.selectedChildren;
    }
    for (let i = 0; i < this.selectedRecords.length; i++) {
      const selected = this.selectedRecords[i];
      if (ActivityCategories.includes(selected)) {
        filter.activity.push(selected);
      } else {
        filter.metric.push(selected);
      }
    }
    return filter;
  }

  updateFilter() {
    this.filterService.updateFilter(<Filter>this.createFilterObj());
    this.filterService.broadcastChange();
  }
  // filterChanged(@Inject(MAT_DIALOG_DATA) data: Record) {
  //   this.filterService.updateFilter()
  // }
}
