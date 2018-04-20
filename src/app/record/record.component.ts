import { Component, OnInit, Input } from '@angular/core';

import { MatDialog, MatDialogConfig } from '@angular/material';

import {
  RecordDialogComponent,
} from '../record-dialog/record-dialog.component';
import { RecordService } from '../record.service';
import { FilterService } from '../filter.service';

import { Record, RecordType } from '../record';
import { Filter } from '../filter';


@Component({
  selector: 'app-record',
  templateUrl: './record.component.html',
  styleUrls: ['./record.component.css']
})
export class RecordComponent implements OnInit {
  @Input() record: Record;
  show = true;

  constructor(
    private dialog: MatDialog,
    private recordService: RecordService,
    private filterService: FilterService
  ) { }

  ngOnInit() {
    this.filterService.changeBroadcast$.subscribe(() => {
      this.filterService.readFilter().subscribe((filter) => {
        this.show = this.decideVisibility(filter);
      });
    });
  }

  decideVisibility(filter: Filter): boolean {
    // either the thing is empty, or our record matches the filter
    console.log(filter.child, this.record.child);
    const childMatch = !filter.child || filter.child === this.record.child;
    const activityMatch = !filter.activity || (
      this.record.type === RecordType.activity &&
      this.record.descriptor === filter.activity
    );
    const metricMatch = !filter.metric || (
      this.record.type === RecordType.metric &&
      this.record.descriptor === filter.metric
    );
    return childMatch && activityMatch && metricMatch;
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
