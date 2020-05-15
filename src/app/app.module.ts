import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { TimeControlPanelComponent } from './components/time-control-panel/time-control-panel.component';
import { WorkButtonComponent } from './components/work-button/work-button.component';
import { PropertyPanelComponent } from './components/property-panel/property-panel.component';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { stateReducer } from './actions/game.actions';
import { AchievementEffects } from './effects/achievement.effects';
import { IncomeEffects } from './effects/income.effects';
import { PropertyRowComponent } from './components/property-row/property-row.component';
import { AchievementPanelComponent } from './components/achievement-panel/achievement-panel.component';
import { FundsPanelComponent } from './components/funds-panel/funds-panel.component';
import { GamePanelComponent } from './components/game-panel/game-panel.component';

@NgModule({
  declarations: [
    AppComponent,
    TimeControlPanelComponent,
    WorkButtonComponent,
    PropertyPanelComponent,
    PropertyRowComponent,
    AchievementPanelComponent,
    FundsPanelComponent,
    GamePanelComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    StoreModule.forRoot({ gameState: stateReducer }),
    EffectsModule.forRoot([IncomeEffects, AchievementEffects]),
    StoreDevtoolsModule.instrument({
      maxAge: 25,
    }),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
