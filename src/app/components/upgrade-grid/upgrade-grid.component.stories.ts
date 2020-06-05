import { moduleMetadata } from '@storybook/angular';
import { UpgradeGridComponent } from 'components/upgrade-grid/upgrade-grid.component';
import { UpgradeCardComponent } from 'components/upgrade-card/upgrade-card.component';

export default {
  title: 'Upgrade Grid',
  decorators: [
    moduleMetadata({
      declarations: [UpgradeGridComponent, UpgradeCardComponent],
    }),
  ],
};

export const withInitialState = () => ({
  component: UpgradeGridComponent,
  props: {
    upgrades: [
      { property: 'salary', toLevel: 1 },
      { property: 'workEfficiency', toLevel: 2 },
      { property: 'salary', toLevel: 2 },
      { property: 'workEfficiency', toLevel: 3 },
      { property: 'businessIncome', toLevel: 1 },
      { property: 'businessIncome', toLevel: 2 },
      { property: 'workEfficiency', toLevel: 4 },
      { property: 'salary', toLevel: 3 },
    ],
  },
});
