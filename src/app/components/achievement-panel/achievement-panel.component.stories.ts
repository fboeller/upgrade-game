import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';

import { AchievementPanelComponent } from './achievement-panel.component';
import { achievements } from 'types/achievement.type';
import { moduleMetadata } from '@storybook/angular';
import { withKnobs, array } from '@storybook/addon-knobs';

export default {
  title: 'Achievement Panel',
  decorators: [
    moduleMetadata({
      imports: [MatListModule, MatIconModule],
    }),
    ,
    withKnobs,
  ],
};

export const knobs = () => ({
  component: AchievementPanelComponent,
  props: {
    achievements: array('achievements', achievements),
  },
});
