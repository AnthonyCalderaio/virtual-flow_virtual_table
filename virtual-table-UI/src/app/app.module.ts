import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { SecondLevelComponent } from './second-level/second-level.component';
import { AppRoutingModule } from './app-routing/app-routing.module';
import { FirstLevelComponent } from './first-level/first-level.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatCardModule, } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ThirdLevelComponent } from './third-level/third-level.component';


@NgModule({
  declarations: [
    AppComponent,
    FirstLevelComponent,
    SecondLevelComponent,
    ThirdLevelComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatCardModule,
    MatDividerModule,
    MatButtonModule,
    MatIconModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
