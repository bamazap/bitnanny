import { Component, OnInit, Input} from '@angular/core';

import { ActivityService } from '../activity.service';

const days = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday'
];

const months = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December'
];

@Component({
  selector: 'app-day',
  templateUrl: './day.component.html',
  styleUrls: ['./day.component.css']
})
export class DayComponent implements OnInit {
  @Input() daysBack: number;
  day = '';
  activities = [];

  constructor(private activityService: ActivityService) { }

  ngOnInit() {
    const d = new Date();
    d.setDate(d.getDate() - this.daysBack);
    this.day = `${days[d.getDay()].slice(0, 3)} ${d.getDate()}`;
    this.getActivities();
  }

  getActivities() {
    this.activities = this.activityService.getActivitiesByDay(this.daysBack);
  }

}
