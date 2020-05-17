import { concat } from 'lodash/fp';

export type Property =
  | 'salary'
  | 'workEfficiency'
  | 'education'
  | 'businessIncome';

export const personalProperties: Property[] = [
  'salary',
  'workEfficiency',
  'education',
];

export const businessProperties: Property[] = ['businessIncome'];

export const properties: Property[] = concat(personalProperties, businessProperties);
