import { Component, OnInit } from '@angular/core';

import { ActivityCategories } from '../record';
import { MetricNames } from '../record';

import { Selection } from '../selection';
import { SelectService } from '../select.service';

@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.css']
})
export class SelectComponent implements OnInit {
  children = [ 'Bryan', 'Emily' ];
  activities = ActivityCategories.slice(0);
  metrics = MetricNames.slice(0);
  selectedChild = '';
  selectedActivity = '';
  selectedMetric = '';

  constructor(private selectService: SelectService) {

  }

  ngOnInit() {
    this.updateSelection();
  }

  createSelectObj () {
    const selection = new Selection();
    selection.child = this.selectedChild;
    selection.activity = this.selectedActivity;
    selection.metric = this.selectedMetric;
    return selection;
  }

  updateSelection() {
    this.selectService.updateSelection(<Selection>this.createSelectObj());
    this.selectService.broadcastChange();
  }
}
