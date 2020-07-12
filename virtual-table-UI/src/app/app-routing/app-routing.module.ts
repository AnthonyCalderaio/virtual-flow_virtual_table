import { NgModule, Injectable } from '@angular/core';
import { Routes, RouterModule, Resolve } from '@angular/router'; // CLI imports router
import { SecondLevelComponent } from '../second-level/second-level.component';
import { FirstLevelComponent } from '../first-level/first-level.component';
import { ThirdLevelComponent } from '../third-level/third-level.component';
import { LigandDetailComponent } from '../ligand-detail/ligand-detail.component';
import { StoreService } from '../store.service';

@Injectable({
  providedIn: 'root',
})
class StoreResolver implements Resolve<any> {
  constructor(private store: StoreService) {}

  resolve(): Promise<any> {
    return this.store.load();
  }
}

const routes: Routes = [
  { path: '', redirectTo: 'first-level', pathMatch: 'full' },
  {
    path: 'first-level',
    component: FirstLevelComponent,
    resolve: { StoreResolver },
  },
  {
    path: 'second-level/:proteinId',
    component: SecondLevelComponent,
    resolve: { StoreResolver },
  },
  {
    path: 'third-level/:proteinId/:compoundId',
    component: ThirdLevelComponent,
    resolve: { StoreResolver },
  },
  { path: 'ligand-detail', component: LigandDetailComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
