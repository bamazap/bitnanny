import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';

// Routing
import { AppRoutingModule } from './app-routing.module';

// Angular Material
import { MatModule } from './mat/mat.module';

// Components
import { AppComponent } from './app.component';
import { MessagesComponent } from './messages/messages.component';
import { LoginComponent } from './login/login.component';
import { RecordsComponent } from './records/records.component';
import { AnalyticsComponent } from './analytics/analytics.component';
import { NavbarComponent } from './navbar/navbar.component';
import { FiltersComponent } from './filters/filters.component';

// Services
import { AuthService } from './auth.service';
import { MessageService } from './message.service';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    MessagesComponent,
    RecordsComponent,
    AnalyticsComponent,
    NavbarComponent,
    FiltersComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    FlexLayoutModule,
    AppRoutingModule,
    MatModule,
  ],
  providers: [
    AuthService,
    MessageService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
