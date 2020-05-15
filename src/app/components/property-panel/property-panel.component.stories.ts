import { PropertyPanelComponent } from './property-panel.component';
import { PropertyRowComponent } from '../property-row/property-row.component';
import { moduleMetadata } from '@storybook/angular';
import { initialState } from 'types/game-state.type';
import { provideMockStore } from '@ngrx/store/testing';

export default {
  title: 'Property Panel',
  decorators: [
    moduleMetadata({
      declarations: [PropertyPanelComponent, PropertyRowComponent],
      imports: [],
      providers: [
        provideMockStore({ initialState: { gameState: initialState } }),
      ],
    }),
  ],
};

export const withInitialState = () => ({
  component: PropertyPanelComponent,
  props: {
    title: 'Properties',
    properties: ['education', 'salary', 'workEfficiency', 'businessIncome'],
  },
});
