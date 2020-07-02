import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import * as molstar from 'src/assets/outsider_projects/version1/molstar.js';
declare  var jQuery:  any;

@Component({
  selector: 'app-third-level',
  templateUrl: './third-level.component.html',
  styleUrls: ['./third-level.component.css']
})
export class ThirdLevelComponent implements OnInit {
  constructor(
    private _location: Location,
    private router: Router) {
    }

  ngOnInit(): void {
    // console.log('thirdLevelData(thirdLevel): ', this.thirdLevelData);
    var viewer = new molstar.Viewer('viewer', {
      layoutIsExpanded: false,
      layoutShowControls: false,
      layoutShowRemoteState: false,
      layoutShowSequence: true,
      layoutShowLog: false,
      layoutShowLeftPanel: true,

      viewportShowExpand: true,
      viewportShowControls: false,
      viewportShowSettings: false,
      viewportShowSelectionMode: false,
      viewportShowAnimation: false,
  });

  viewer.loadStructuresFromUrlsAndMerge([
      { url: pdbqtUrl, format: 'pdbqt' },
      { url: mol2Url, format: 'mol2' }
  ]);

    
  }

  wholeData = JSON.parse(JSON.stringify(this.router.getCurrentNavigation().extras))
  thirdLevelData = this.wholeData.level3

  backClicked() {
    console.log('Clicked back')
    this.router.navigate(['/second-level'], this.wholeData);
  }
  asIsOrder(a, b) {
    return 1;
  }

}
