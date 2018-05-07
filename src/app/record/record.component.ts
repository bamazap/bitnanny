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
import * as Fraction from 'fraction.js';

const vulgarFractions = {
  0: '',
  [1/10]: '⅒',
  [1/9]: '⅑',
  [1/8]: '⅛',
  [1/7]: '⅐',
  [1/6]: '⅙',
  [1/5]: '⅕',
  [1/4]: '¼',
  [1/3]: '⅓',
  [1/2]: '½',
  [2/5]: '⅖',
  [2/3]: '⅔',
  [3/8]: '⅜',
  [3/5]: '⅗',
  [3/4]: '¾',
  [4/5]: '⅘',
  [5/8]: '⅝',
  [5/6]: '⅚',
  [7/8]: '⅞',
};

function closestVulgarFraction(value: number): string {
  let minDistance = Infinity;
  let closestFrac = '';
  Object.entries(vulgarFractions).forEach(([decimal, fraction]) => {
    const distance = Math.abs(Number(decimal) - value);
    if (distance < minDistance) {
      minDistance = distance;
      closestFrac = fraction;
    }
  });
  return closestFrac;
}

@Component({
  selector: 'app-record',
  templateUrl: './record.component.html',
  styleUrls: ['./record.component.css']
})
export class RecordComponent implements OnInit {
  @Input() record: Record;
  show = true;
  recordStyle = {};
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
    const recordColor = ActivityColors[this.record.descriptor] ||
      MetricColors[this.record.descriptor];
    if (this.record.type === RecordType.activity) {
      this.recordStyle['background-color'] = recordColor;
    }
    if (this.record.type === RecordType.metric) {
      this.recordStyle['border-color'] = recordColor;
    }
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

  time(value: number): string {
    const hours = Math.floor(value);
    const minutes = (value - hours) * 60;
    const nearestFiveMinutes = Math.round((minutes/ 5) * 5);
    return `${hours} ${closestVulgarFraction(nearestFiveMinutes / 60)}`;
  }

  starSrc(value: number): string {
    return `assets/img/star-${value}.png`;
  }

}
