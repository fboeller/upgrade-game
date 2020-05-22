import { moduleMetadata } from '@storybook/angular';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { UpgradeGridComponent } from 'components/upgrade-grid/upgrade-grid.component';
import { UpgradeCardComponent } from 'components/upgrade-card/upgrade-card.component';

export default {
  title: 'Upgrade Grid',
  decorators: [
    moduleMetadata({
      imports: [MatGridListModule, MatCardModule, MatButtonModule],
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
    ],
  },
});
