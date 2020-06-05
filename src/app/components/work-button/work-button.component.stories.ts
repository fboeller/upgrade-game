import { moduleMetadata } from '@storybook/angular';
import { initialState } from 'types/game-state.type';
import { provideMockStore } from '@ngrx/store/testing';
import { WorkButtonComponent } from './work-button.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { of } from 'rxjs';
import { provideMockActions } from '@ngrx/effects/testing';

export default {
  title: 'Work Button',
  decorators: [
    moduleMetadata({
      declarations: [WorkButtonComponent],
      imports: [BrowserAnimationsModule],
      providers: [
        provideMockStore({ initialState: { gameState: initialState } }),
        provideMockActions(() => of([])),
      ],
    }),
  ],
};

export const withInitialState = () => ({
  component: WorkButtonComponent,
});
