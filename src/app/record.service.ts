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

  readRecordsByDay(day: number): Observable<Record[]> {
    return this.http.get<Record[]>(`${recordsUrl}/?day=${day}`);
  }

  readAllRecords(): Observable<Record[]> {
    return this.http.get<Record[]>(`${recordsUrl}`);
  }

  // TODO: figure out return type
  updateRecord(record: Record): Observable<any> {
    return this.http.put(recordsUrl, record, httpOptions);
  }

  createRecord(record: Record): Observable<Record> {
    return this.http.post<Record>(recordsUrl, record, httpOptions);
  }

  deleteRecord(record: Record): Observable<Record> {
    return 
  }

}
