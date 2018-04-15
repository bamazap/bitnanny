import { Injectable } from '@angular/core';

import { MatSnackBar } from '@angular/material';


@Injectable()
export class MessageService {
  constructor(public snackBar: MatSnackBar) {}

  add(content: string, action = 'dismiss') {
    this.snackBar.open(content, action);
  }

  clear() {
    this.snackBar.dismiss();
  }
}
