import { Component, OnInit } from '@angular/core';

import { ActivityCategories } from '../record';
import { MetricNames } from '../record';

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

  constructor() { }

  ngOnInit() {
    this.activities = ActivityCategories.map((name, id) => {
      return { id, name };
    });
    this.metrics = MetricNames.map((name, id) => {
      return { id, name };
    });
  }

}
