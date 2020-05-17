export type Powerup = 'coffee';

export const powerups: Powerup[] = ['coffee'];

export interface PowerupType {
  displayName: string,
  actionText: string;
  effect: { [property: string]: (number) => number };
  duration: number;
  cost: number;
}

export const powerupMap: { [key: string]: PowerupType } = {
  coffee: {
    displayName: 'Coffee',
    actionText: 'Buy',
    effect: {
      salary: (salary) => salary * 2,
    },
    duration: 5000,
    cost: 5,
  },
};
