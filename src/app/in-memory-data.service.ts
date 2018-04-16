import { InMemoryDbService } from 'angular-in-memory-web-api';

import { Activity } from './activity';
import { unixDays } from '../utils';

function withID<T>(obj: T, i: number): T & { id: number } {
  obj['id'] = i;
  return <T & { id: number }>obj;
}

export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    // day means number of days ago (so we get the same load each time)
    const activities: Activity[] = [
      { day: 0, children: [0, 1], category: 'sleep', duration: 8 },
      { day: 0, children: [0], category: 'athletics', duration: 1.5 },
      { day: 1, children: [0, 1], category: 'sleep', duration: 6 },
    ].map(withID);
    // convert day to unixDays
    activities.forEach((activity) => {
      activity.day = unixDays(new Date().getTime()) - activity.day;
    });
    return { activities };
  }
}
