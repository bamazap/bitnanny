import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';

import { Selection } from './selection';

import { Subject } from 'rxjs/Subject';


@Injectable()
export class SelectService {
  selection: Selection;

  private changeSource = new Subject<string>();

  changeBroadcast$ = this.changeSource.asObservable();


  readSelection(): Observable<Selection> {
    return of(this.selection);
  }

  broadcastChange() {
    this.changeSource.next('change');
  }

  updateSelection(selection: Selection) {
    this.selection = selection;
  }
}
