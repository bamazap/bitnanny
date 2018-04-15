import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.css']
})
export class FiltersComponent implements OnInit {
  children = [
    { id: 0, name: 'Brian' },
    { id: 1, name: 'Emily' },
  ];

  activities = [
    { id: 0, name: 'Sleep'},
    { id: 1, name: 'Athletics'},
    { id: 2, name: 'Electronics'},
  ];

  metrics = [
    { id: 0, name: 'Mood'},
    { id: 1, name: 'Energy'},
  ];

  constructor() { }

  ngOnInit() {
  }

}
