import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { TimeControlPanelComponent } from './time-control-panel/time-control-panel.component';

@NgModule({
  declarations: [
    AppComponent,
    TimeControlPanelComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
