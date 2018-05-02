import { Component, OnInit, Inject, NgZone } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';

import { NeutronRatingModule } from 'neutron-star-rating';

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
      value: [this.value, [Validators.required, Validators.min(0), Validators.max(24)]],
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

  radioChange(_evt) {
    this.form.patchValue({ descriptor: null, value: null });
  }

  onRatingClicked(ratingNum) {
    this.form.patchValue({ value: ratingNum });
  }
}
