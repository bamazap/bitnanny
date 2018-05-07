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

const intToChild = {1: 'Bryan', 0: 'Emily'};

function generateSleep(nDays: number): RecordNoID[] {
  return [].concat(...range(2).map(child => range(nDays).map((day) => {
    const value = randint(6, 9) + 0.5 * randint(-1, 1);
    return {day, child: intToChild[child], descriptor: 'Sleep', value, type: RecordType.activity};
  })));
}

function moodFromSleep(hours: number): number {
  return Math.round((10 - (randint(1, 3) + randint(1, 5) * (Math.min(Math.abs(hours - 9), 5) / 5))) / 2);
}

function generateMood(sleep: RecordNoID[]): RecordNoID[] {
  return sleep.map((sleepRecord) => {
    const { value: hours, day, child } = sleepRecord;
    const value = moodFromSleep(hours);
    return {day, child, descriptor: 'Mood', value, type: RecordType.metric};
  });
}

export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    // day means number of days ago (so we get the same load each time)
    const sleep = generateSleep(14);
    const mood = generateMood(sleep);
    const records = sleep.concat(mood).concat([
      { day: 1, child: 'Emily', descriptor: 'Arts', value: 1 },
      { day: 8, child: 'Emily', descriptor: 'Arts', value: 1 },
      { day: 12, child: 'Emily', descriptor: 'Arts', value: 1 },
      { day: 3, child: 'Bryan', descriptor: 'Exercise', value: 1.5 },
      { day: 4, child: 'Emily', descriptor: 'Exercise', value: 2 },
      { day: 9, child: 'Bryan', descriptor: 'Exercise', value: 1.5 },
      { day: 11, child: 'Emily', descriptor: 'Exercise', value: 1 },
      { day: 11, child: 'Bryan', descriptor: 'Exercise', value: 1 },
      { day: 2, child: 'Bryan', descriptor: 'Electronics', value: 2 },
      { day: 2, child: 'Emily', descriptor: 'Electronics', value: 2 },
      { day: 5, child: 'Bryan', descriptor: 'Electronics', value: 1 },
      { day: 8, child: 'Bryan', descriptor: 'Electronics', value: 4 },
      { day: 10, child: 'Bryan', descriptor: 'Electronics', value: 1.5 },
      { day: 13, child: 'Bryan', descriptor: 'Electronics', value: 2 },
    ].map(r => withType(r, RecordType.activity))).map(withID);
    // convert day to unixDays
    records.forEach((record) => {
      record.day = unixDays(new Date().getTime()) - record.day;
    });
    return { records };
  }
}
