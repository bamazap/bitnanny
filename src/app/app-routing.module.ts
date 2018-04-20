import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { RecordsComponent } from './records/records.component';
import { AnalyticsComponent } from './analytics/analytics.component';


const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'records', component: RecordsComponent},
  { path: 'analytics', component: AnalyticsComponent},
  { path: '', redirectTo: '/records', pathMatch: 'full' },
];

@NgModule({
  exports: [RouterModule],
  imports: [RouterModule.forRoot(routes)],
})
export class AppRoutingModule {}
