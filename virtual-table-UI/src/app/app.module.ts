import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { SecondLevelComponent } from './second-level/second-level.component';
import { AppRoutingModule } from './app-routing/app-routing.module';
import { FirstLevelComponent } from './first-level/first-level.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { LigandDetailComponent } from './ligand-detail/ligand-detail.component';
import { MatMenuModule } from '@angular/material/menu';
import { MatSliderModule } from '@angular/material/slider';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { Ng5SliderModule } from 'ng5-slider';
import { MatTableModule } from '@angular/material/table';

import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { ImageComponent } from './shared/image.component';
import { ThirdLevelComponent } from './third-level/third-level.component';

@NgModule({
  declarations: [
    AppComponent,
    FirstLevelComponent,
    SecondLevelComponent,
    ThirdLevelComponent,
    LigandDetailComponent,
    ImageComponent
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
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production,
    }),
  ],
  exports: [MatPaginatorModule],
  providers: [
    {
      useClass: HashLocationStrategy,
      provide: LocationStrategy,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
