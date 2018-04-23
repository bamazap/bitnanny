import { Component, OnInit } from '@angular/core';

import { ActivityCategories } from '../record';
import { MetricNames } from '../record';

import { Filter } from '../filter';
import { FilterService } from '../filter.service';

@Component({
  selector: 'app-plot-control',
  templateUrl: './plot-control.component.html',
  styleUrls: ['./plot-control.component.css']
})
export class PlotControlComponent implements OnInit {
  children = [
    { id: 0, name: 'Bryan' },
    { id: 1, name: 'Emily' },
  ];
  activities: { id: number, name: string}[] = [];
  metrics: { id: number, name: string}[] = [];
  selectedChild = '';
  selectedActivity = '';
  selectedMetric = '';

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
    filter.child = typeof this.selectedChild === 'number' ? this.children[this.selectedChild].name : '';
    filter.activity = typeof this.selectedActivity === 'number' ? this.activities[this.selectedActivity].name : '';
    filter.metric = typeof this.selectedMetric === 'number' ? this.metrics[this.selectedMetric].name : '';
    return filter;
  }

  updateFilter() {
    this.filterService.updateFilter(<Filter>this.createFilterObj());
    this.filterService.broadcastChange();
  }
}
