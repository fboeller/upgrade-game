import { PropertyPanelComponent } from './property-panel.component';
import { PropertyRowComponent } from '../property-row/property-row.component';
import { moduleMetadata } from '@storybook/angular';
import { initialState } from 'types/game-state.type';
import { provideMockStore } from '@ngrx/store/testing';
import { MatButtonModule } from '@angular/material/button';
import { withKnobs, array, text } from '@storybook/addon-knobs';
import { properties } from 'types/property.type';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

export default {
  title: 'Property Panel',
  decorators: [
    moduleMetadata({
      imports: [BrowserAnimationsModule, MatButtonModule],
      declarations: [PropertyPanelComponent, PropertyRowComponent],
      providers: [
        provideMockStore({ initialState: { gameState: initialState } }),
      ],
    }),
    withKnobs,
  ],
};

export const knobs = () => ({
  component: PropertyPanelComponent,
  props: {
    title: text('title', 'Properties'),
    properties: array('properties', properties),
  },
});
