import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';

import { Filter } from './filter';

const filterUrl = 'api/filter';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class FilterService {

  constructor(private http: HttpClient) { }

  readFilter(): Observable<Filter> {
    return this.http.get<Filter>(`${filterUrl}`);
  }

  updateFilter(filter: Filter): Observable<any> {
    return this.http.put(filterUrl, filter, httpOptions);
  }
}
