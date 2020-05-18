export type Powerup = 'coffee';

export const powerups: Powerup[] = ['coffee'];

export interface PowerupType {
  displayName: string;
  actionText: string;
  duration: number;
  cost: number;
}

export const powerupMap: { [key: string]: PowerupType } = {
  coffee: {
    displayName: 'Coffee',
    actionText: 'Buy',
    duration: 5000,
    cost: 5,
  },
};
