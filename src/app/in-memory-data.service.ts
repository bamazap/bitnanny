import { InMemoryDbService } from 'angular-in-memory-web-api';

import { Activity } from './activity';
import { unixDays, range, randint } from '../utils';

function withID<T>(obj: T, i: number): T & { id: number } {
  obj['id'] = i;
  return <T & { id: number }>obj;
}

interface ActivityNoID {
  day: number;
  child: number;
  category: string;
  duration: number;
}

function generateSleep(nDays: number): ActivityNoID [] {
  return [].concat(...range(2).map(child => range(nDays).map((day) => {
    const duration = randint(6, 9) + 0.5 * randint(-1, 1);
    return {day, child, category: 'sleep', duration};
  })));
}

export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    // day means number of days ago (so we get the same load each time)
    const activities: Activity[] = generateSleep(14).concat([
      { day: 1, child: 1, category: 'arts', duration: 1 },
      { day: 8, child: 1, category: 'arts', duration: 1 },
      { day: 2, child: 0, category: 'athletics', duration: 1.5 },
      { day: 4, child: 0, category: 'athletics', duration: 1.5 },
      { day: 9, child: 0, category: 'athletics', duration: 1.5 },
      { day: 8, child: 0, category: 'electronics', duration: 3 },
    ]).map(withID);
    // convert day to unixDays
    activities.forEach((activity) => {
      activity.day = unixDays(new Date().getTime()) - activity.day;
    });
    return { activities };
  }
}
