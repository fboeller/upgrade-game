import { moduleMetadata } from '@storybook/angular';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { UpgradeCardComponent } from 'components/upgrade-card/upgrade-card.component';

export default {
  title: 'Upgrade Card',
  decorators: [
    moduleMetadata({
      imports: [MatCardModule, MatButtonModule],
      declarations: [UpgradeCardComponent],
    }),
  ],
};

export const withInitialState = () => ({
  component: UpgradeCardComponent,
  props: {
    propertyName: 'salary',
    level: 0,
  },
});
