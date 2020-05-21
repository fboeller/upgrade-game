import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';

import { AchievementPanelComponent } from './achievement-panel.component';
import { achievements } from 'types/achievement.type';
import { take } from 'lodash/fp';
import { moduleMetadata } from '@storybook/angular';

export default {
  title: 'Achievement Panel',
  decorators: [
    moduleMetadata({
      imports: [MatListModule, MatIconModule],
    }),
  ],
};

export const empty = () => ({
  component: AchievementPanelComponent,
  props: {
    achievements: [],
  },
});

export const withOneAchievement = () => ({
  component: AchievementPanelComponent,
  props: {
    achievements: take(1)(achievements),
  },
});

export const withTwoAchievements = () => ({
  component: AchievementPanelComponent,
  props: {
    achievements: take(2)(achievements),
  },
});

export const withAllAchievements = () => ({
  component: AchievementPanelComponent,
  props: {
    achievements,
  },
});
