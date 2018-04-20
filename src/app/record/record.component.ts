import { Component, OnInit, Input } from '@angular/core';

import { MatDialog, MatDialogConfig } from '@angular/material';

import {
  RecordDialogComponent,
} from '../record-dialog/record-dialog.component';
import { RecordService } from '../record.service';

import { Record } from '../record';


@Component({
  selector: 'app-record',
  templateUrl: './record.component.html',
  styleUrls: ['./record.component.css']
})
export class RecordComponent implements OnInit {
  @Input() record: Record;

  constructor(
    private dialog: MatDialog,
    private recordService: RecordService
  ) { }

  ngOnInit() {
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
              this.record.descriptor = data.descriptor;
              this.record.type = data.type;
            });
        }
      });
  }

}
