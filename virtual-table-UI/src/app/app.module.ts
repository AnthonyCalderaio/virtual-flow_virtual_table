import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { SecondLevelComponent } from './second-level/second-level.component';
import { AppRoutingModule } from './app-routing/app-routing.module';
import { FirstLevelComponent } from './first-level/first-level.component';

@NgModule({
  declarations: [
    AppComponent,
    FirstLevelComponent,
    SecondLevelComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
