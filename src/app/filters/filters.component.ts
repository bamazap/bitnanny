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
  children = [
    { id: 0, name: 'Brian' },
    { id: 1, name: 'Emily' },
  ];
  activities: { id: number, name: string}[] = [];
  metrics: { id: number, name: string}[] = [];
  selectedChild : string = '';
  selectedActivity : string = '';
  selectedMetric : string = '';

  constructor(private filterService: FilterService) {

  }

  ngOnInit() {
    this.updateFilter();
    this.activities = ActivityCategories.map((name, id) => {
      return { id, name };
    });
    this.metrics = MetricNames.map((name, id) => {
      return { id, name };
    });
  }

  createFilterObj () {
    const filter = new Filter();
    filter.child = this.selectedChild ? this.children[this.selectedChild].name : '';
    filter.activity = this.selectedActivity ? this.activities[this.selectedActivity].name.toLowerCase() : '';
    filter.metric = this.selectedMetric ? this.metrics[this.selectedMetric].name.toLowerCase() : '';
    return filter;
  }

  updateFilter() {
    this.filterService.updateFilter(<Filter>this.createFilterObj());
    this.filterService.broadcastChange();
  }

  onChange() {
    console.log('blah');
  }
  // filterChanged(@Inject(MAT_DIALOG_DATA) data: Record) {
  //   this.filterService.updateFilter()
  // }
}
