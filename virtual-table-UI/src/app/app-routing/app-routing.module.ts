import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router'; // CLI imports router
import { SecondLevelComponent } from '../second-level/second-level.component';
import { AppComponent } from '../app.component';
import { FirstLevelComponent } from '../first-level/first-level.component';
import { ThirdLevelComponent } from '../third-level/third-level.component';


const routes: Routes = [
  { path: '', component: AppComponent },
  { path: 'first-level',component: FirstLevelComponent},
  { path: 'second-level', component: SecondLevelComponent },
  { path: 'third-level', component:ThirdLevelComponent}
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
