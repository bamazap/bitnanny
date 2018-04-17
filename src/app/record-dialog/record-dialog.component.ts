import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';

import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';


@Component({
  selector: 'app-record-dialog',
  templateUrl: './record-dialog.component.html',
  styleUrls: ['./record-dialog.component.css']
})
export class RecordDialogComponent implements OnInit {
  form: FormGroup;
  description: string;
  number: number;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<RecordDialogComponent>,
    @Inject(MAT_DIALOG_DATA) data
  ) {
    this.description = data.description;
    this.number = data.number;
  }

  ngOnInit() {
    this.form = this.fb.group({
      description: [this.description, []],
      number: [this.number, []],
    });
  }

  save() {
    this.dialogRef.close(this.form.value);
  }

  close() {
    this.dialogRef.close();
  }

}
