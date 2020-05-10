import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { TimeControlPanelComponent } from './time-control-panel/time-control-panel.component';
import { WorkButtonComponent } from './work-button/work-button.component';
import { PersonalPanelComponent } from './personal-panel/personal-panel.component';
import { BusinessPanelComponent } from './business-panel/business-panel.component';
import { StoreModule } from '@ngrx/store';
import { stateReducer } from './actions';

@NgModule({
  declarations: [
    AppComponent,
    TimeControlPanelComponent,
    WorkButtonComponent,
    PersonalPanelComponent,
    BusinessPanelComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    StoreModule.forRoot({ gameState: stateReducer })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
