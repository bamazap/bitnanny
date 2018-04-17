import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { HttpClientModule } from '@angular/common/http';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';

// Routing
import { AppRoutingModule } from './app-routing.module';

// Angular Material
import { MatModule } from './mat/mat.module';

// Components
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RecordsComponent } from './records/records.component';
import { AnalyticsComponent } from './analytics/analytics.component';
import { NavbarComponent } from './navbar/navbar.component';
import { FiltersComponent } from './filters/filters.component';
import { DayComponent } from './day/day.component';
import { RecordDialogComponent } from './record-dialog/record-dialog.component';
import { RecordComponent } from './record/record.component';

// Services
import { AuthService } from './auth.service';
import { MessageService } from './message.service';
import { RecordService } from './record.service';

import { InMemoryDataService } from './in-memory-data.service';
import { AddRecordComponent } from './add-record/add-record.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RecordsComponent,
    AnalyticsComponent,
    NavbarComponent,
    FiltersComponent,
    DayComponent,
    RecordDialogComponent,
    RecordComponent,
    AddRecordComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    AppRoutingModule,
    MatModule,
    HttpClientModule,
    HttpClientInMemoryWebApiModule.forRoot(
      InMemoryDataService,
      { dataEncapsulation: false, delay: 0 }
    )
  ],
  providers: [
    AuthService,
    MessageService,
    RecordService,
  ],
  bootstrap: [AppComponent],
  entryComponents: [RecordDialogComponent]
})
export class AppModule { }
