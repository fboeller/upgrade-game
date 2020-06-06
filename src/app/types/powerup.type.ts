export type Powerup = 'coffee';

export const powerups: Powerup[] = ['coffee'];

export interface PowerupType {
  displayName: string;
  actionText: string;
  duration: number;
  cost: number;
  effect: { [property: string]: (value: number, count: number) => number };
}

export const powerupMap: { [key: string]: PowerupType } = {
  coffee: {
    displayName: 'Coffee',
    actionText: 'Buy',
    duration: 5000,
    cost: 5,
    effect: {
      workEfficiency: (value, count) => value / Math.pow(2, count),
    },
  },
};
