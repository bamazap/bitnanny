export class RecordNoID {
  day: number;
  child: string;
  descriptor: string;
  value: number;
  type: RecordType;
}

export class Record extends RecordNoID {
  id: number;
}

export enum RecordType {
  activity = 'Activity',
  metric = 'Metric',
}

export const ActivityCategories = [
  'Athletics',
  'Arts',
  'Academics',
  'Sleep',
  'Electronics',
];

export const MetricNames = [
  'Mood',
  'Energy',
];
