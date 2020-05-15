import { moduleMetadata } from '@storybook/angular';
import { provideMockStore } from '@ngrx/store/testing';
import { TimeControlPanelComponent } from './time-control-panel.component';

export default {
  title: 'Time Control Panel',
  decorators: [
    moduleMetadata({
      declarations: [TimeControlPanelComponent],
      imports: [],
      providers: [
        provideMockStore({ initialState: { gameState: {} } }),
      ],
    }),
  ],
};

export const timeActive = () => ({
  component: TimeControlPanelComponent,
  props: {
    timeActive: true
  }
});

export const timeInactive = () => ({
  component: TimeControlPanelComponent,
  props: {
    timeActive: false
  }
});
