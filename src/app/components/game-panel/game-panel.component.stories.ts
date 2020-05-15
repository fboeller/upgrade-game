import { GamePanelComponent } from './game-panel.component';
import { FundsPanelComponent } from '../funds-panel/funds-panel.component';
import { PropertyPanelComponent } from '../property-panel/property-panel.component';
import { PropertyRowComponent } from '../property-row/property-row.component';
import { TimeControlPanelComponent } from '../time-control-panel/time-control-panel.component';
import { WorkButtonComponent } from '../work-button/work-button.component';
import { moduleMetadata } from '@storybook/angular';
import { provideMockStore } from '@ngrx/store/testing';
import { initialState } from '../../types/game-state.type';
import { personalProperties, businessProperties } from '../../types/property.type';

export default {
  title: 'Game Panel',
  decorators: [
    moduleMetadata({
      declarations: [
        GamePanelComponent,
        FundsPanelComponent,
        PropertyPanelComponent,
        PropertyRowComponent,
        TimeControlPanelComponent,
        WorkButtonComponent,
      ],
      providers: [
        provideMockStore({ initialState: { gameState: initialState } }),
      ],
    }),
  ],
};

export const full = () => ({
  component: GamePanelComponent,
  props: {
    funds: 10,
    timeActive: true,
    becameAffordablePersonalProperties: personalProperties,
    becameAffordableBusinessProperties: businessProperties,
  },
});
