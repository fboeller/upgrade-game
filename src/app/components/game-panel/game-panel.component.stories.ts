import { GamePanelComponent } from './game-panel.component';
import { FundsPanelComponent } from 'components/funds-panel/funds-panel.component';
import { PropertyPanelComponent } from 'components/property-panel/property-panel.component';
import { PropertyRowComponent } from 'components/property-row/property-row.component';
import { TimeControlPanelComponent } from 'components/time-control-panel/time-control-panel.component';
import { WorkButtonComponent } from 'components/work-button/work-button.component';
import { moduleMetadata } from '@storybook/angular';
import { provideMockStore } from '@ngrx/store/testing';
import { initialState } from 'types/game-state.type';
import { personalProperties, businessProperties } from 'types/property.type';
import { BoostPanelComponent } from 'components/boost-panel/boost-panel.component';
import { BoostCardComponent } from 'components/boost-card/boost-card.component';
import { provideMockActions } from '@ngrx/effects/testing';
import { of } from 'rxjs';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

export default {
  title: 'Game Panel',
  decorators: [
    moduleMetadata({
      imports: [BrowserAnimationsModule],
      declarations: [
        GamePanelComponent,
        FundsPanelComponent,
        PropertyPanelComponent,
        PropertyRowComponent,
        TimeControlPanelComponent,
        BoostPanelComponent,
        BoostCardComponent,
        WorkButtonComponent,
      ],
      providers: [
        provideMockStore({ initialState: { gameState: initialState } }),
        provideMockActions(() => of()),
      ],
    }),
  ],
};

export const full = () => ({
  component: GamePanelComponent,
  props: {
    funds: 10,
    timeActive: true,
    availablePersonalProperties: personalProperties,
    availableBusinessProperties: businessProperties,
    boosts: [],
  },
});
