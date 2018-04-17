import { Component, OnInit } from '@angular/core';

import { range } from '../../utils';

@Component({
  selector: 'app-records',
  templateUrl: './records.component.html',
  styleUrls: ['./records.component.css']
})
export class RecordsComponent implements OnInit {
  daysToShow: number[] = [];
  latestDay = 0;

  constructor() { }

  ngOnInit() {
    this.generateDaysArray();
  }

  travelBackward() {
    this.latestDay += 1;
    this.generateDaysArray();
  }

  travelForward() {
    this.latestDay -= 1;
    this.generateDaysArray();
  }

  private generateDaysArray() {
    this.daysToShow = range(this.latestDay + 6, this.latestDay - 1 , -1);
  }

}
