import { NgModule } from '@angular/core';
import { MatTabsModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// Imports all Angular Material modules used in the application
// Include this wherever you'd like to use the components
@NgModule({
  imports: [
    BrowserAnimationsModule,
    MatTabsModule
  ],
  exports: [
    BrowserAnimationsModule,
    MatTabsModule
  ],
})
export class MatModule { }
