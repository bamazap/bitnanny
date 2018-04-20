import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatTabsModule } from '@angular/material/tabs';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';

// Imports all Angular Material modules used in the application
// Include this wherever you'd like to use the components
@NgModule({
  imports: [
    BrowserAnimationsModule,
    MatTabsModule,
    MatSelectModule,
    MatSnackBarModule,
    MatIconModule,
    MatDialogModule,
    MatCardModule,
    MatInputModule,
    MatRadioModule,
  ],
  exports: [
    BrowserAnimationsModule,
    MatTabsModule,
    MatSelectModule,
    MatSnackBarModule,
    MatIconModule,
    MatDialogModule,
    MatCardModule,
    MatInputModule,
    MatRadioModule,
  ],
})
export class MatModule { }
