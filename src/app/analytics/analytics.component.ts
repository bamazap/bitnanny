import { Component, OnInit } from '@angular/core';
import * as Plotly from 'plotly.js';
import {Config, Data, Layout} from 'plotly.js';
import { FilterService } from '../filter.service';
import { Filter } from '../filter';
import { RecordService } from '../record.service';


@Component({
  selector: 'app-analytics',
  templateUrl: './analytics.component.html',
  styleUrls: ['./analytics.component.css']
})
export class AnalyticsComponent implements OnInit {
  
  currentChild = 'Bryan';
  currentActivity = 'Sleep';
  currentMetric = 'Mood';
  show = false;

  x = [7, 3, 8, 5, 10, 9, 8, 4, 5, 6];
  y: [3, 1, 4, 3, 4, 3.5, 4.2, 1.2, 0.4, 2.1];

  records = [];
  dayNumber = 1;

  //activityToLabel = {Sleep: 'Hours of Sleep'};
  //metricToLabel = {Mood: 'Mood'};

  constructor(private filterService: FilterService, private recordService: RecordService) { }

  getPlotData(x,y) {
    const trace: any = {
      x: x,
      y: y,
      mode: 'markers',
      type: 'scatter',
      marker: {size: 16, color: '#041144'}
    };
    const data = [trace];
    return data;
  }

  getPlotLayout(child, activity, metric) {
    const layout = {
    title: activity + ' vs. ' + metric + ' for ' + child,
    titlefont: { size: 18, color: '#041144'},
    xaxis: {
      title: activity,
      titlefont: {size: 16, color: '#041144'}
    },
    yaxis: {
      title: metric,
      titlefont: {size: 16, color: '#041144'}
    },
  };
  return layout;
  }

  getRecords() {
    this.recordService.readAllRecords()
      .subscribe((records) => {
        this.records = records;
      });
  }

  recordsForChild(records, child, activity, metric) {
    var x = [];
    var y = [];
    var days = this.records.map(record => record.day);
    for (var i = 0; i < days.length; i++) {
      var day = days[i];
      var dayActivities = this.records.filter(record => record.day == day && record.descriptor == activity && record.child == child);
      var dayMetrics = this.records.filter(record => record.day == day && record.descriptor == metric && record.child == child);
      if (dayActivities.length > 0 && dayMetrics.length > 0) {
        var dayMetric = dayMetrics[0];
        var dayActivity = dayActivities[0];
        x.push(dayActivity.value);
        y.push(dayMetric.value);
      }
    }
    return [x,y];
  }

  decideVisibility(filter: Filter): boolean {
    return !!(filter.child && filter.activity && filter.metric);
  }

  getChild(filter: Filter): string {
    return filter.child;
  }

  getActivity(filter: Filter): string {
    return filter.activity;
  }

  getMetric(filter: Filter): string {
    return filter.metric;
  }

  ngOnInit() {
    this.getRecords();
    var data = this.getPlotData( this.x, this.y );
    var layout = this.getPlotLayout(
      this.currentChild,
      this.currentActivity,
      this.currentMetric
    );
    this.filterService.readFilter().subscribe((filter) => {
      if (filter) {
        this.show = this.decideVisibility(filter);
      }
    });
    this.filterService.changeBroadcast$.subscribe(() => {
      this.filterService.readFilter().subscribe((filter) => {
        if (filter) {
          var records = this.records;
          this.show = this.decideVisibility(filter);
          this.currentChild = this.getChild(filter);
          this.currentActivity = this.getActivity(filter);
          this.currentMetric = this.getMetric(filter);
          var x_y = this.recordsForChild(records, this.currentChild, this.currentActivity, this.currentMetric);
          var x = x_y[0];
          var y = x_y[1];
          var data = this.getPlotData(x, y);
          var layout = this.getPlotLayout(this.currentChild, this.currentActivity, this.currentMetric);
          console.log('happened');
          Plotly.newPlot('myDiv', data, layout, {displayModeBar: false});
        }
      });
    });
    Plotly.newPlot('myDiv', data, layout, {displayModeBar: false});
  }

}
