import { Component, OnInit } from '@angular/core';
import * as Plotly from 'plotly.js';
import {Config, Data, Layout} from 'plotly.js';
import { SelectService } from '../select.service';
import { Selection } from '../selection';


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

  data = {
    Bryan: {
      Sleep: {
        Mood: {
          x: [7, 3, 8, 5, 10, 9, 8, 4, 5, 6],
          y: [3, 1, 4, 3, 4, 3.5, 4.2, 1.2, 0.4, 2.1]
        },
      },
    },
    Emily: {
      Sleep: {
        Mood: {
          x: [7, 3, 8, 5, 10, 9, 8, 4, 5, 6],
          y: [3, 1, 4, 3, 4, 3.5, 4.2, 1.2, 0.4, 2.1]
        },
      },
    }
  };

  // activityToLabel = {Sleep: 'Hours of Sleep'};
  // metricToLabel = {Mood: 'Mood'};

  constructor(private selectService: SelectService) { }

  getPlotData(_child, _activity, _metric) {
    const child = 'Bryan';
    const activity = 'Sleep';
    const metric = 'Mood';
    const currentX = this.data[child][activity][metric].x;
    const currentY = this.data[child][activity][metric].y;
    const revY = currentY.map(i => 5 - i);
    const trace: any = {
      x: currentX,
      y: currentY,
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
    const data = this.getPlotData(
      this.currentChild,
      this.currentActivity,
      this.currentMetric
    );
    const layout = this.getPlotLayout(
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
          const layout = this.getPlotLayout(
            this.currentChild,
            this.currentActivity,
            this.currentMetric
          );
          Plotly.newPlot('myDiv', data, layout, {displayModeBar: false});
        }
      });
    });
  }

}
