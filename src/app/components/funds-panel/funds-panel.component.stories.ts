import { FundsPanelComponent } from './funds-panel.component';
import { withKnobs, number } from '@storybook/addon-knobs';

export default {
  title: 'Funds Panel',
  decorators: [withKnobs],
};

export const knobs = () => ({
  component: FundsPanelComponent,
  props: {
    funds: number('funds', 0),
    fundsEffect: number('fundsEffect', -5),
  },
});
