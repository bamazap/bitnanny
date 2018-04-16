import { Injectable } from '@angular/core';


const mockData = [
      [
        {
          id: 0,
          children: [0],
          category: 'athletics',
          duration: 1.5,
          description: 'soccer',
        },
      ],
    ];

@Injectable()
export class ActivityService {

  constructor() { }

  getActivitiesByDay(day: number) {
    return mockData[day];
  }

}
