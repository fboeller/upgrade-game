import { moduleMetadata } from '@storybook/angular';
import { initialState } from 'types/game-state.type';
import { provideMockStore } from '@ngrx/store/testing';
import { WorkButtonComponent } from './work-button.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { of } from 'rxjs';
import { provideMockActions } from '@ngrx/effects/testing';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressBarModule } from '@angular/material/progress-bar';

export default {
  title: 'Work Button',
  decorators: [
    moduleMetadata({
      declarations: [WorkButtonComponent],
      imports: [
        BrowserAnimationsModule,
        MatIconModule,
        MatButtonModule,
        MatProgressBarModule,
      ],
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
