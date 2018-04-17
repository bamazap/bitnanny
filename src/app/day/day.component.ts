import { Component, OnInit, Input} from '@angular/core';

import { Record } from '../record';
import { RecordService } from '../record.service';
import { unixDays } from '../../utils';

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
  dayNumber: number;
  dayText = '';
  records: Record[] = [];

  constructor(private recordService: RecordService) { }

  ngOnInit() {
    const d = new Date();
    d.setDate(d.getDate() - this.daysBack);
    this.dayText = `${days[d.getDay()].slice(0, 3)} ${d.getDate()}`;
    this.dayNumber = unixDays(new Date().getTime()) - this.daysBack;

    this.getRecords();
  }

  getRecords() {
    this.recordService.readRecordsByDay(this.dayNumber)
      .subscribe(records => this.records = records);
  }

  onAdd(record: Record) {
    this.records.push(record);
  }

}
