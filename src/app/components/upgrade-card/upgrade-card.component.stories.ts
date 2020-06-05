import { moduleMetadata } from '@storybook/angular';
import { UpgradeCardComponent } from 'components/upgrade-card/upgrade-card.component';
import { withKnobs, number, select } from '@storybook/addon-knobs';
import { properties } from 'types/property.type';

export default {
  title: 'Upgrade Card',
  decorators: [
    moduleMetadata({
      declarations: [UpgradeCardComponent],
    }),
    withKnobs,
  ],
};

export const withInitialState = () => ({
  component: UpgradeCardComponent,
  props: {
    propertyName: select('propertyName', properties, 'salary'),
    level: number('level', 0),
  },
});
