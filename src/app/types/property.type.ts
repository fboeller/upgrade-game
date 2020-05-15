import { Increase } from './increase.type';

export type Property =
  | 'education'
  | 'salary'
  | 'businessIncome'
  | 'workEfficiency';

export const personalProperties: Property[] = [
  'education',
  'salary',
  'workEfficiency',
];
export const businessProperties: Property[] = ['businessIncome'];
