import { moduleMetadata } from '@storybook/angular';
import { initialState } from 'types/game-state.type';
import { provideMockStore } from '@ngrx/store/testing';
import { WorkButtonComponent } from './work-button.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

export default {
  title: 'Work Button',
  decorators: [
    moduleMetadata({
      declarations: [WorkButtonComponent],
      imports: [
        BrowserAnimationsModule,
      ],
      providers: [
        provideMockStore({ initialState: { gameState: initialState } }),
      ],
    }),
  ],
};

export const withInitialState = () => ({
  component: WorkButtonComponent,
});
