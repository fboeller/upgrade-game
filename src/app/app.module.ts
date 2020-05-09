import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { TimeControlPanelComponent } from './time-control-panel/time-control-panel.component';
import { WorkButtonComponent } from './work-button/work-button.component';
import { PersonalPanelComponent } from './personal-panel/personal-panel.component';

@NgModule({
  declarations: [
    AppComponent,
    TimeControlPanelComponent,
    WorkButtonComponent,
    PersonalPanelComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
