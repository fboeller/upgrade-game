import { AchievementPanelComponent } from './achievement-panel.component';
import { achievements } from 'types/achievement.type';
import { withKnobs, array } from '@storybook/addon-knobs';

export default {
  title: 'Achievement Panel',
  decorators: [withKnobs],
};

export const knobs = () => ({
  component: AchievementPanelComponent,
  props: {
    achievements: array('achievements', achievements),
  },
});
