import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';

import { Activity } from './activity';


@Injectable()
export class ActivityService {

  constructor(private http: HttpClient) { }

  private activitiesUrl = 'api/activities';

  getActivitiesByDay(day: number): Observable<Activity[]> {
    return this.http.get<Activity[]>(`${this.activitiesUrl}/?day=${day}`);
  }

}
