import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { TimeControlPanelComponent } from './components/time-control-panel/time-control-panel.component';
import { WorkButtonComponent } from './components/work-button/work-button.component';
import { PersonalPanelComponent } from './components/personal-panel/personal-panel.component';
import { BusinessPanelComponent } from './components/business-panel/business-panel.component';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { stateReducer } from './actions/game.actions';
import { IncomeEffects } from './effects/income.effects';
import { PropertyRowComponent } from './components/property-row/property-row.component';

@NgModule({
  declarations: [
    AppComponent,
    TimeControlPanelComponent,
    WorkButtonComponent,
    PersonalPanelComponent,
    BusinessPanelComponent,
    PropertyRowComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    StoreModule.forRoot({ gameState: stateReducer }),
    EffectsModule.forRoot([IncomeEffects]),
    StoreDevtoolsModule.instrument({
      maxAge: 25,
    }),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
