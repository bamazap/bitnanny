import { Component, OnInit } from '@angular/core';
import * as Plotly from 'plotly.js';
import {Config, Data, Layout} from 'plotly.js';
import { FilterService } from '../filter.service';
import { Filter } from '../filter';
import { RecordService } from '../record.service';
import { SelectService } from '../select.service';
import { Selection } from '../selection';
import { Record } from '../record';


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

  records: Record[] = [];
  dayNumber = 1;

  // activityToLabel = {Sleep: 'Hours of Sleep'};
  // metricToLabel = {Mood: 'Mood'};

  constructor(
    private filterService: FilterService,
    private recordService: RecordService,
    private selectService: SelectService
  ) { }

  getPlotData(x, y) {
      const trace: any = {
      x: x,
      y: y,
      mode: 'markers',
      type: 'scatter',
      hoverinfo: 'none',
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
    const x = [];
    const y = [];
    const days = this.records.map(record => record.day);
    for (let i = 0; i < days.length; i++) {
      const day = days[i];
      const dayActivities = this.records.filter(record =>
        record.day === day &&
        record.descriptor === activity &&
        record.child === child
      );
      const dayMetrics = this.records.filter(record =>
        record.day === day &&
        record.descriptor === metric &&
        record.child === child
      );
      if (dayActivities.length > 0 && dayMetrics.length > 0) {
        const dayMetric = dayMetrics[0];
        const dayActivity = dayActivities[0];
        x.push(dayActivity.value);
        y.push(dayMetric.value);
      }
    }
    return [x, y];
  }

  decideVisibility(selection: Selection): boolean {
    return !!(selection.child && selection.activity && selection.metric);
  }

  getChild(selection: Selection): string {
    return selection.child;
  }

  getActivity(selection: Selection): string {
    return selection.activity;
  }

  getMetric(selection: Selection): string {
    return selection.metric;
  }

  ngOnInit() {
    let data = this.getPlotData(this.x, this.y);
    this.getRecords();
    let layout = this.getPlotLayout(
      this.currentChild,
      this.currentActivity,
      this.currentMetric
    );
    Plotly.newPlot('myDiv', data, layout, {displayModeBar: false});
    this.selectService.readSelection().subscribe((selection) => {
      if (selection) {
        this.show = this.decideVisibility(selection);
      }
    });
    this.selectService.changeBroadcast$.subscribe(() => {
      this.selectService.readSelection().subscribe((selection) => {
        if (selection) {
          this.show = this.decideVisibility(selection);
          this.currentChild = this.getChild(selection);
          this.currentActivity = this.getActivity(selection);
          this.currentMetric = this.getMetric(selection);
          layout = this.getPlotLayout(
            this.currentChild,
            this.currentActivity,
            this.currentMetric
          );
          const records = this.records;
          const x_y = this.recordsForChild(
            records,
            this.currentChild,
            this.currentActivity,
            this.currentMetric
          );
          const x = x_y[0];
          const y = x_y[1];
          data = this.getPlotData(x, y);
          const newLayout = this.getPlotLayout(
            this.currentChild,
            this.currentActivity,
            this.currentMetric
          );
          Plotly.newPlot('myDiv', data, newLayout, {displayModeBar: false});
        }
      });
    });
  }

}
