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

// Other Third-Party Modules
import { NeutronRatingModule } from 'neutron-star-rating';

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
import { AddRecordComponent } from './add-record/add-record.component';
import { SelectComponent } from './select/select.component';


// Services
import { AuthService } from './auth.service';
import { MessageService } from './message.service';
import { RecordService } from './record.service';
import { FilterService } from './filter.service';
import { SelectService } from './select.service';

import { InMemoryDataService } from './in-memory-data.service';


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
    SelectComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    AppRoutingModule,
    MatModule,
    NeutronRatingModule,
    HttpClientModule,
    HttpClientInMemoryWebApiModule.forRoot(
      InMemoryDataService,
      { dataEncapsulation: false, delay: 0 }
    ),
  ],
  providers: [
    AuthService,
    MessageService,
    RecordService,
    FilterService,
    SelectService,
  ],
  bootstrap: [AppComponent],
  entryComponents: [RecordDialogComponent]
})
export class AppModule { }
