import { Component, OnInit } from '@angular/core';
import * as Plotly from 'plotly.js';
import {Config, Data, Layout} from 'plotly.js';
import { FilterService } from '../filter.service';
import { Filter } from '../filter';
import { RecordService } from '../record.service';
import { SelectService } from '../select.service';
import { Selection } from '../selection';
import { Record } from '../record';
import * as regression from 'regression';


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

  itemsToLabels = {'Sleep': 'Hours of Sleep', 'Mood': 'Mood Rating',
                    'Exercise': 'Hours of Exercise', 'Academic Performance': 'GPA'};

  x = [7, 3, 8, 5, 10, 9, 8, 4, 5, 6];
  y = [3, 1, 4, 3, 4, 3.5, 4.2, 1.2, 0.4, 2.1];

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
      var fittedLineX = [];
      var fittedLineY = [];
      if (x.length == y.length && x.length > 0) {
        var points = [];
        for (var i = 0; i < x.length; i++) {
          points.push([x[i], y[i]]);
        }
        var result = regression.linear(points);
        var fitPoints = result.points;
        fittedLineX = fitPoints.map(point => point[0]);
        fittedLineY = fitPoints.map(point => point[1]);
      }
      const trace: any = {
        x: x,
        y: y,
        mode: 'markers',
        type: 'scatter',
        hoverinfo: 'none',
        marker: {size: 16, color: '#041144'}
      };
      const trace2: any = {
        x: fittedLineX,
        y: fittedLineY,
        mode: 'lines',
        type: 'scatter'
      }

    const data = [trace, trace2];
    return data;
  }

  getPlotLayout(child, activity, metric) {
    var activityLabel = this.itemsToLabels[activity];
    var metricLabel = this.itemsToLabels[metric];
    if (activityLabel == undefined) {
      activityLabel = activity;
    }
    if (metricLabel == undefined) {
      metricLabel = metric;
    }
    const layout = {
    title: activity + ' vs. ' + metric + ' for ' + child,
    showlegend: false,
    titlefont: { size: 36, color: '#041144'},
    xaxis: {
      title: activityLabel,
      titlefont: {size: 28, color: '#041144'},
      tickfont: {size: 22, color: '#041144'}
    },
    yaxis: {
      title: metricLabel,
      titlefont: {size: 28, color: '#041144'}, 
      tickfont: {size: 22, color: '#041144'}
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
