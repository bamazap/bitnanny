import { Component, OnInit } from '@angular/core';
import * as Plotly from 'plotly.js';
import {Config, Data, Layout} from 'plotly.js';
import { FilterService } from '../filter.service';
import { Filter } from '../filter';


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

  //activityToLabel = {Sleep: 'Hours of Sleep'};
  //metricToLabel = {Mood: 'Mood'};

  constructor(private filterService: FilterService) { }

  getPlotData(_child, _activity, _metric) {
    var child = 'Bryan';
    var activity = 'Sleep';
    var metric = 'Mood';
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
    var data = this.getPlotData(
      this.currentChild,
      this.currentActivity,
      this.currentMetric
    );
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
          this.show = this.decideVisibility(filter);
          this.currentChild = this.getChild(filter);
          this.currentActivity = this.getActivity(filter);
          this.currentMetric = this.getMetric(filter);
          // var data = this.getPlotData(this.currentChild, this.currentActivity, this.currentMetric);
          var layout = this.getPlotLayout(this.currentChild, this.currentActivity, this.currentMetric);
          console.log('happened');
          Plotly.newPlot('myDiv', data, layout, {displayModeBar: false});
        }
      });
    });
    Plotly.newPlot('myDiv', data, layout, {displayModeBar: false});
  }

}
