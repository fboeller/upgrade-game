export type Boost = 'coffee';

export const boosts: Boost[] = ['coffee'];

export interface BoostType {
  displayName: string;
  actionText: string;
  icon: string;
  duration: number;
  cost: number;
  effect: { [property: string]: (count: number) => (value: number) => number };
}

export const boostMap: { [key: string]: BoostType } = {
  coffee: {
    displayName: 'Coffee',
    actionText: 'Buy',
    icon: 'fa-coffee',
    duration: 5000,
    cost: 5,
    effect: {
      workEfficiency: (count) => (value) => value / Math.pow(2, count),
    },
  },
};
