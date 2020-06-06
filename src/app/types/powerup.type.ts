export type Powerup = 'coffee';

export const powerups: Powerup[] = ['coffee'];

export interface PowerupType {
  displayName: string;
  actionText: string;
  icon: string;
  duration: number;
  cost: number;
  effect: { [property: string]: (count: number) => (value: number) => number };
}

export const powerupMap: { [key: string]: PowerupType } = {
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
