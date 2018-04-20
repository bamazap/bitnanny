import { InMemoryDbService } from 'angular-in-memory-web-api';

import { Record, RecordNoID, RecordType } from './record';
import { unixDays, range, randint } from '../utils';

function withID<T>(obj: T, i: number): T & { id: number } {
  obj['id'] = i;
  return <T & { id: number }>obj;
}

function withType<T>(obj: T, type: RecordType): T & { type: RecordType} {
  obj['type'] = type;
  return <T & { type: RecordType }>obj;
}

const intToChild = {0: 'Bryan', 1: 'Emily'};

function generateSleep(nDays: number): RecordNoID[] {
  return [].concat(...range(2).map(child => range(nDays).map((day) => {
    const value = randint(6, 9) + 0.5 * randint(-1, 1);
    return {day, child: intToChild[child], descriptor: 'Sleep', value, type: RecordType.activity};
  })));
}

function generateMood(nDays: number): RecordNoID[] {
  return [].concat(...range(2).map(childID => range(nDays).map((day) => {
    const value = randint(1, 5);
    const child = childID === 1 ? 'Bryan' : 'Emily';
    return {day, child, descriptor: 'Mood', value, type: RecordType.metric};
  })));
}

export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    // day means number of days ago (so we get the same load each time)
    const activities: Record[] = generateSleep(14).concat([
      { day: 1, child: 'Bryan', descriptor: 'Arts', value: 1 },
      { day: 8, child: 'Bryan', descriptor: 'Arts', value: 1 },
      { day: 2, child: 'Emily', descriptor: 'Athletics', value: 1.5 },
      { day: 4, child: 'Emily', descriptor: 'Athletics', value: 1.5 },
      { day: 9, child: 'Emily', descriptor: 'Athletics', value: 1.5 },
      { day: 8, child: 'Emily', descriptor: 'Electronics', value: 3 },
    ].map(r => withType(r, RecordType.activity))).map(withID);
    const metrics: Record[] = generateMood(14).map(withID);
    const records = activities.concat(metrics);
    // convert day to unixDays
    records.forEach((record) => {
      record.day = unixDays(new Date().getTime()) - record.day;
    });
    return { records };
  }
}
