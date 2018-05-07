import { Component, OnInit, Input} from '@angular/core';

import { Record, RecordType } from '../record';
import { RecordService } from '../record.service';
import { unixDays, compare, filterInPlace } from '../../utils';

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
  today = '';

  constructor(private recordService: RecordService) { }

  ngOnInit() {
    const d = new Date();
    d.setDate(d.getDate() - this.daysBack);
    this.dayText = `${days[d.getDay()].slice(0, 3)} ${d.getDate()}`;
    this.dayNumber = unixDays(new Date().getTime()) - this.daysBack;
    this.getRecords();
    if (this.daysBack == 0) {
      this.today = 'today';
    }
  }

  getRecords() {
    this.recordService.readRecordsByDay(this.dayNumber)
      .subscribe(records => {
        this.records = records;
        this.sortRecords();
      });
  }

  afterAdd(record: Record) {
    this.records.push(record);
    this.sortRecords();
  }

  afterDelete(deletedID: number) {
    filterInPlace(this.records, record => record.id !== deletedID);
  }

  sortRecords() {
    this.records.sort((recordA, recordB) => {
      if (recordA.type === recordB.type) {
        return compare(recordA.descriptor, recordB.descriptor);
      }
      return compare(recordA.type, recordB.type);
    });
  }
}
