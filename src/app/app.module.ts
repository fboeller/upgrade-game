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
import { stateReducer } from './game.reducer';
import { AchievementEffects } from './effects/achievement.effects';
import { IncomeEffects } from './effects/income.effects';
import { PropertyRowComponent } from './components/property-row/property-row.component';
import { AchievementPanelComponent } from './components/achievement-panel/achievement-panel.component';
import { FundsPanelComponent } from './components/funds-panel/funds-panel.component';
import { GamePanelComponent } from './components/game-panel/game-panel.component';
import { PropertyEffects } from 'effects/property.effects';
import { BoostPanelComponent } from './components/boost-panel/boost-panel.component';
import { BoostCardComponent } from './components/boost-card/boost-card.component';
import { BoostEffects } from 'effects/boost.effects';
import { UpgradeCardComponent } from './components/upgrade-card/upgrade-card.component';
import { UpgradeGridComponent } from './components/upgrade-grid/upgrade-grid.component';
import { AchievementListComponent } from './components/achievement-list/achievement-list.component';
import { ProgressBarComponent } from './components/progress-bar/progress-bar.component';
import { ActiveBoostsListComponent } from './components/active-boosts-list/active-boosts-list.component';

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
    BoostPanelComponent,
    BoostCardComponent,
    UpgradeCardComponent,
    UpgradeGridComponent,
    AchievementListComponent,
    ProgressBarComponent,
    ActiveBoostsListComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    StoreModule.forRoot({ gameState: stateReducer }),
    EffectsModule.forRoot([
      IncomeEffects,
      AchievementEffects,
      PropertyEffects,
      BoostEffects,
    ]),
    StoreDevtoolsModule.instrument({
      maxAge: 25,
    }),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
