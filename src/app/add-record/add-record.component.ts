import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { MatDialog, MatDialogConfig } from '@angular/material';

import {
  RecordDialogComponent,
} from '../record-dialog/record-dialog.component';
import { RecordService } from '../record.service';

import { Record, RecordNoID } from '../record';

@Component({
  selector: 'app-add-record',
  templateUrl: './add-record.component.html',
  styleUrls: ['./add-record.component.css']
})
export class AddRecordComponent implements OnInit {
  @Input() day: number;
  @Output() afterAdd = new EventEmitter<Record>();

  constructor(
    private dialog: MatDialog,
    private recordService: RecordService
  ) { }

  ngOnInit() {
  }

  openDialog() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.data = new RecordNoID();

    this.dialog.open(RecordDialogComponent, dialogConfig)
      .afterClosed().subscribe(data => {
        if (data) {
          this.recordService.createRecord(data)
            .subscribe(record => this.afterAdd.emit(record));
        }
      });
  }

}
