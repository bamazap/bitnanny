import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';

import { Record, ActivityCategories, MetricNames } from '../record';


@Component({
  selector: 'app-record-dialog',
  templateUrl: './record-dialog.component.html',
  styleUrls: ['./record-dialog.component.css']
})
export class RecordDialogComponent implements OnInit {

  form: FormGroup;
  descriptor: string;
  value: number;
  child: string;
  day: number;
  recordType: string;
  activityCategories = ActivityCategories;
  metricNames = MetricNames;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<RecordDialogComponent>,
    @Inject(MAT_DIALOG_DATA) data: Record
  ) {
    this.descriptor = data.descriptor;
    this.value = data.value;
    this.child = data.child;
    this.day = data.day;
    this.recordType = data.type;
  }

  ngOnInit() {
    this.form = this.fb.group({
      descriptor: [this.descriptor, [Validators.required]],
      value: [this.value, [Validators.required]],
      child: [this.child, [Validators.required]],
      day: [this.day, [Validators.required]],
    });
  }

  save() {
    const data: any = { type: this.recordType };
    this.dialogRef.close(Object.assign( data, this.form.value));
  }

  close() {
    this.dialogRef.close();
  }

  radioChange() {
    this.form.patchValue({ descriptor: null, value: null });
  }

}
