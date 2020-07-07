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
import { LigandDetailComponent } from './ligand-detail/ligand-detail.component';
import { MatMenuModule } from '@angular/material/menu';
import { MatSliderModule } from '@angular/material/slider';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { Ng5SliderModule } from 'ng5-slider';
import { ScrollingModule } from '@angular/cdk/scrolling';


@NgModule({
  declarations: [
    AppComponent,
    FirstLevelComponent,
    SecondLevelComponent,
    ThirdLevelComponent,
    LigandDetailComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatCardModule,
    MatDividerModule,
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    MatSliderModule,
    MatCheckboxModule,
    Ng5SliderModule,
    ScrollingModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
