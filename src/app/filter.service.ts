import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';

import { Filter } from './filter';

import { Subject } from 'rxjs/Subject';


@Injectable()
export class FilterService {
  filter: Filter;

  private changeSource = new Subject<string>();

  changeBroadcast$ = this.changeSource.asObservable();

  readFilter(): Observable<Filter> {
    return of(this.filter);
  }

  broadcastChange() {
    this.changeSource.next('change');
  }

  updateFilter(filter: Filter) {
    this.filter = filter;
  }
}
