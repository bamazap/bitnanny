import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/throw';


@Injectable()
export class AuthService {
  login(username: string, password: string): Observable<boolean> {
    if (username === password) return Observable.of(true);
    return Observable.throw(new Error('Incorrect login.'));
  }
}
