import { InMemoryDbService } from 'angular-in-memory-web-api';

export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const activities: Object<number, Activity[]> = [
      { id: 0, day: 0, children: [0, 1], category: 'sleep', duration: 8 },
      { id: 1, day: 0, children: [0], category: 'athletics', duration: 1.5 },
      { id: 0, day: 1, children: [0, 1], category: 'sleep', duration: 6 },
    ];
    return { activities };
  }
}
