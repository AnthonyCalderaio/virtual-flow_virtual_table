import { Component, OnInit, ElementRef } from '@angular/core';
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
    private router: Router,
    private el: ElementRef) {
    }
    HTMLElement: any;

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
      { url: './assets/sample_urls/Receptor.pdbqt', format: 'pdbqt' },
      { url: './assets/sample_urls/Ligand.mol2', format: 'mol2' }
  ]);
  this.HTMLElement = document.getElementsByClassName("msp-plugin")[0];

  // this.HTMLElement = this.el.nativeElement(`msp-plugin`);
  // this.HTMLElement.setAttribute("style", "max-width: 80%;")
  this.HTMLElement.setAttribute("style", "top: 60%; margin:5% ")

  //Below one is top
  // this.HTMLElement.setAttribute("style", "top: 60%; max-width:80%; left:50%")
  // this.HTMLElement.setAttribute("style", "bottom: 10%;")
  console.log('computer style:'+this.HTMLElement)
    
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
