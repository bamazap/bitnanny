import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import {MatTabsModule} from '@angular/material/tabs';
import {MatSelectModule} from '@angular/material/select';
import {MatSnackBarModule} from '@angular/material/snack-bar';

// Imports all Angular Material modules used in the application
// Include this wherever you'd like to use the components
@NgModule({
  imports: [
    BrowserAnimationsModule,
    MatTabsModule,
    MatSelectModule,
    MatSnackBarModule,
  ],
  exports: [
    BrowserAnimationsModule,
    MatTabsModule,
    MatSelectModule,
    MatSnackBarModule,
  ],
})
export class MatModule { }
