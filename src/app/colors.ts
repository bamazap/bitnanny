import { ActivityCategories, MetricNames } from './record';
const ChildNames = ['Bryan', 'Emily'];
const activityColors = ["#fab1a0", "#81ecec", "#74b9ff", "#ffeaa7", "#55efc4"]; 
const metricColors = ["#00b894", "#fdcb6e", "#0984e3"]; 
import { randint } from '../utils';

export const ActivityColors: {[s: string]: string} = {};
export const MetricColors: {[s: string]: string} = {};
export const ChildColors: {[s: string]: string} = {};

let hue = randint(0, 359);
let skip = Math.floor(360 / (ActivityCategories.length + MetricNames.length));
var index = 0; 
ActivityCategories.forEach((activityCateogry) => {
  ActivityColors[activityCateogry] = activityColors[index]; //`hsl(${activityColors[index]}, 85%, 75%)`;
  // hue = (hue + skip) % 359;
  index += 1; 
});

index = 0; 
MetricNames.forEach((metricName) => {
  MetricColors[metricName] = metricColors[index]; //`hsl(${hue}, 85%, 75%)`;
  // hue += (hue + skip) % 359;
  index += 1; 
});

hue = randint(0, 270);
skip = Math.floor(270 / 2); // TODO: dynamic num children
ChildNames.forEach((childName) => {
  ChildColors[childName] = `hsl(${hue + 90}, 50%, 40%)`;
  hue += (hue + skip) % 270;

});
