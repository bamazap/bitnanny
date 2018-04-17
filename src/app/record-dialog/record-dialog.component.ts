import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';

import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';

import { Record } from '../record';


@Component({
  selector: 'app-record-dialog',
  templateUrl: './record-dialog.component.html',
  styleUrls: ['./record-dialog.component.css']
})
export class RecordDialogComponent implements OnInit {
  form: FormGroup;
  descriptor: string;
  value: number;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<RecordDialogComponent>,
    @Inject(MAT_DIALOG_DATA) data: Record
  ) {
    this.descriptor = data.descriptor;
    this.value = data.value;
  }

  ngOnInit() {
    this.form = this.fb.group({
      descriptor: [this.descriptor, []],
      value: [this.value, []],
    });
  }

  save() {
    this.dialogRef.close(this.form.value);
  }

  close() {
    this.dialogRef.close();
  }

}
