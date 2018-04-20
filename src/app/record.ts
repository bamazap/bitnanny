export class RecordNoID {
  day: number;
  child: number;
  descriptor: string;
  value: number;
  type: RecordType;
}

export class Record extends RecordNoID {
  id: number;
}

export enum RecordType {
  activity = 'activity',
  metric = 'metric',
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
