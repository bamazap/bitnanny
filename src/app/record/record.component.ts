import { Component, OnInit, Input } from '@angular/core';

import { MatDialog, MatDialogConfig } from '@angular/material';

import {
  RecordDialogComponent,
} from '../record-dialog/record-dialog.component';
import { RecordService } from '../record.service';
import { FilterService } from '../filter.service';

import { Record, RecordType } from '../record';
import { Filter } from '../filter';
import { ActivityColors, MetricColors, ChildColors } from '../colors';

@Component({
  selector: 'app-record',
  templateUrl: './record.component.html',
  styleUrls: ['./record.component.css']
})
export class RecordComponent implements OnInit {
  @Input() record: Record;
  show = true;
  recordColor = '';
  childColor = '';
  maxChildWidthCH = 0;

  constructor(
    private dialog: MatDialog,
    private recordService: RecordService,
    private filterService: FilterService
  ) { }

  ngOnInit() {
    this.filterService.readFilter().subscribe((filter) => {
      this.show = this.decideVisibility(filter);
    });
    this.filterService.changeBroadcast$.subscribe(() => {
      this.filterService.readFilter().subscribe((filter) => {
        this.show = this.decideVisibility(filter);
      });
    });
    this.recordColor = ActivityColors[this.record.descriptor] ||
      MetricColors[this.record.descriptor];
    this.childColor = ChildColors[this.record.child];
    this.maxChildWidthCH = 5; // TODO: dynamically calculate
  }

  // TODO: ew. I couldn't think of better boolean logic...
  decideVisibility(filter: Filter): boolean {
    // either the thing is empty, or our record matches the filter
    const childMatch = filter.child.length === 0 || filter.child.includes(this.record.child);
    const noActivityFilters = filter.activity.length === 0;
    const noMetricFilters = filter.metric.length === 0;
    const activityMatch = !noActivityFilters && (
      this.record.type === RecordType.activity &&
      filter.activity.includes(this.record.descriptor)
    );
    const metricMatch = !noMetricFilters && (
      this.record.type === RecordType.metric &&
      filter.metric.includes(this.record.descriptor)
    );
    return childMatch &&
      ((noActivityFilters && noMetricFilters)
      || noActivityFilters && metricMatch
      || noMetricFilters && activityMatch
      || (activityMatch || metricMatch));
  }

  openDialog() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.data = this.record;

    this.dialog.open(RecordDialogComponent, dialogConfig)
      .afterClosed().subscribe(data => {
        if (data) {
          this.recordService.updateRecord(<Record>this.record)
            .subscribe(() => {
              this.record.value = data.value;
              this.record.child = data.child;
              this.record.descriptor = data.descriptor;
              this.record.type = data.type;
            });
        }
      });
  }

}
