export class RecordNoID {
  day: number;
  child: string;
  descriptor: string;
  value: number;
}

export class Record extends RecordNoID {
  id: number;
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
