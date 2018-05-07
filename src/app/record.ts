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
  'Exercise',
  'Arts',
  'Homework',
  'Sleep',
  'Electronics',
];

export const MetricNames = [
  'Mood',
  'Energy',
  'Academics'
];
