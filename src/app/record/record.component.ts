import { Component, OnInit, Input } from '@angular/core';

import { MatDialog, MatDialogConfig } from '@angular/material';

import {
  RecordDialogComponent,
} from '../record-dialog/record-dialog.component';
import { ActivityService } from '../activity.service';

import { Activity } from '../activity';
import { Metric } from '../metric';

@Component({
  selector: 'app-record',
  templateUrl: './record.component.html',
  styleUrls: ['./record.component.css']
})
export class RecordComponent implements OnInit {
  @Input() record: Activity | Metric;

  constructor(
    private dialog: MatDialog,
    private activityService: ActivityService
  ) { }

  ngOnInit() {
    this.record['number'] = this.record['duration'] || this.record['rating'];
    this.record['description'] = this.record['category'] || this.record['name'];
  }

  openDialog() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.data = this.record;

    this.dialog.open(RecordDialogComponent, dialogConfig)
      .afterClosed().subscribe(data => {
        this.record['duration'] = data.number;
        this.record['category'] = data.description;
        this.activityService.updateActivity(<Activity>this.record)
          .subscribe(() => {
            this.record['number'] = data.number;
            this.record['description'] = data.description;
          });
      });
  }

}
