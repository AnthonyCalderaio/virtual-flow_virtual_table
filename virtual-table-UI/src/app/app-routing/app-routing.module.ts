import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router'; // CLI imports router
import { SecondLevelComponent } from '/Users/anthonycalderaio/Desktop/Code/virtual-flow_projects/virtual-flow_virtual_table/virtual-table-UI/src/app/second-level/second-level.component';
import { AppComponent } from '/Users/anthonycalderaio/Desktop/Code/virtual-flow_projects/virtual-flow_virtual_table/virtual-table-UI/src/app/app.component';
import { FirstLevelComponent } from '/Users/anthonycalderaio/Desktop/Code/virtual-flow_projects/virtual-flow_virtual_table/virtual-table-UI/src/app/first-level/first-level.component';


const routes: Routes = [
  { path: '', component: AppComponent },
  { path: 'first-level',component: FirstLevelComponent},
  { path: 'second-level', component: SecondLevelComponent }
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
