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
  mins: number;
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
    //console.log(data.value)
    this.descriptor = data.descriptor;
    if (data.value) {
      this.value = Math.floor(data.value);
      this.mins = Math.round(data.value % 1 * 60);
    }
    else {
      this.value = 0;
      this.mins = 0;
    }
    this.child = data.child;
    this.day = data.day;
    this.recordType = data.type;
  }

  ngOnInit() {
    this.form = this.fb.group({
      descriptor: [this.descriptor, [Validators.required]],
      // it's totally unclear to me why this variable can't be called value, but it took me 3 hours to figure this out...
      value1: [this.value, [Validators.required, Validators.min(0), Validators.max(24)]],
      mins: [this.mins, [Validators.min(0), Validators.max(59)]],
      child: [this.child, [Validators.required]],
      day: [this.day, [Validators.required]],
    });
  }

  save() {
    const data: any = { type: this.recordType };
    if (this.recordType === 'Activity') {
      this.form.value.value1 += this.form.value.mins / 60;
    }
    // this line is really stupid but i didn't know how else to get a 0 to display properly
    this.form.value.value = this.form.value.value1;
    this.dialogRef.close(Object.assign( data, this.form.value ));
  }

  close() {
    this.dialogRef.close();
  }

  delete() {
    const data: any = { type: this.recordType };
    this.dialogRef.close(delete this.recordType);
  }

  radioChange(_evt) {
    this.form.patchValue({ descriptor: null, value1: 0, mins: 0 });
  }

  minutesChanged(_evt) {
    // i don't know how to do this part. i can't get the ui to update
    // console.log(_evt);
    // console.log(_evt.target.value)
    // this.value = 50;
    // this.form.value.value1 = 50;
    // if (_evt.target.value < 0) {
    //   this.form.value.value1 = Math.max(this.form.value.value1 - 1, 0);
    //   this.form.value.mins = 45;
    // }
    // if (_evt.target.value >= 60) {
    //   this.form.value.value1++;
    //   this.form.value.mins = 0;
    // }
  }

  onRatingClicked(ratingNum) {
    this.form.patchValue({ value1: ratingNum });
  }
}
