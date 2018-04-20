import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';

import { Filter } from './filter';

import { Subject }    from 'rxjs/Subject';

const filterUrl = 'api/filter';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class FilterService {
  filter: Filter;

  private changeSource = new Subject<string>();

  changeBroadcast$ = this.changeSource.asObservable();

  constructor(private http: HttpClient) { }

  readFilter(): Observable<Filter> {
    return of(this.filter);
  }

  broadcastChange() {
    this.changeSource.next('change');
  }

  updateFilter(filter: Filter): Observable<any> {
    this.filter = filter;
    return null;
  }
}
