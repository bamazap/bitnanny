import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';

import { Record } from './record';


const recordsUrl = 'api/records';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};


@Injectable()
export class RecordService {

  constructor(private http: HttpClient) { }

  getRecordsByDay(day: number): Observable<Record[]> {
    return this.http.get<Record[]>(`${recordsUrl}/?day=${day}`);
  }

  updateRecord(record: Record) {
    return this.http.put(recordsUrl, record, httpOptions);
  }

}
