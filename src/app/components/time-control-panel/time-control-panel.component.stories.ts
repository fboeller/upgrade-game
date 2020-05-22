import { moduleMetadata } from '@storybook/angular';
import { provideMockStore } from '@ngrx/store/testing';
import { TimeControlPanelComponent } from './time-control-panel.component';
import { withKnobs, boolean } from '@storybook/addon-knobs';

export default {
  title: 'Time Control Panel',
  decorators: [
    moduleMetadata({
      declarations: [TimeControlPanelComponent],
      imports: [],
      providers: [provideMockStore({ initialState: { gameState: {} } })],
    }),
    withKnobs,
  ],
};

export const knobs = () => ({
  component: TimeControlPanelComponent,
  props: {
    timeActive: boolean('timeActive', false),
  },
});
