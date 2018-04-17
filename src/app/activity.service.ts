import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';

import { Activity } from './activity';


const activitiesUrl = 'api/activities';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};


@Injectable()
export class ActivityService {

  constructor(private http: HttpClient) { }

  private activitiesUrl = 'api/activities';


  getActivitiesByDay(day: number): Observable<Activity[]> {
    return this.http.get<Activity[]>(`${activitiesUrl}/?day=${day}`);
  }

  updateActivity(activity: Activity) {
    return this.http.put(activitiesUrl, activity, httpOptions);
  }

}
