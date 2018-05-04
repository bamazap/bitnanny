import { ActivityCategories, MetricNames } from './record';
const ChildNames = ['Bryan', 'Emily'];
import { randint } from '../utils';

export const ActivityColors: {[s: string]: string} = {};
export const MetricColors: {[s: string]: string} = {};
export const ChildColors: {[s: string]: string} = {};

let hue = randint(0, 359);
let skip = Math.floor(360 / (ActivityCategories.length + MetricNames.length));
ActivityCategories.forEach((activityCateogry) => {
  ActivityColors[activityCateogry] = `hsl(${hue}, 85%, 75%)`;
  hue = (hue + skip) % 359;
});
MetricNames.forEach((metricName) => {
  MetricColors[metricName] = `hsl(${hue}, 85%, 75%)`;
  hue += (hue + skip) % 359;
});

hue = randint(0, 270);
skip = Math.floor(270 / 2); // TODO: dynamic num children
ChildNames.forEach((childName) => {
  ChildColors[childName] = `hsl(${hue + 90}, 50%, 40%)`;
  hue += (hue + skip) % 270;

});
