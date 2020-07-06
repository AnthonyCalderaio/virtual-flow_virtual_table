import { Component, OnInit, ElementRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import * as molstar from 'src/assets/outsider_projects/version1/molstar.js';
// import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
// declare var jQuery: any;

@Component({
  selector: 'app-third-level',
  templateUrl: './third-level.component.html',
  styleUrls: ['./third-level.component.css']
})
export class ThirdLevelComponent implements OnInit {
  value: string;

  wholeData: any;
  constructor(
    private _location: Location,
    private router: Router,
    private route: ActivatedRoute,
    private el: ElementRef) {
    this.wholeData
      = JSON.parse(JSON.stringify(this.router.getCurrentNavigation().extras)) != undefined
        ? JSON.parse(JSON.stringify(this.router.getCurrentNavigation().extras))
        : this.router.getCurrentNavigation().extras
    console.log('Got ', this.wholeData)
    this.route.params.subscribe(params => {
      this.value = params['value'];
      console.log(this.value);
    });

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
      // { url: 'https://virtualflow-covid.hms.harvard.edu/Structures/'+this.wholeData.pr+'mpro_s1_ds1/Receptor.pdbqt', format: 'pdbqt' },
      { url: './assets/sample_urls/Ligand.mol2', format: 'mol2' },
    ]);
    this.HTMLElement = document.getElementsByClassName("msp-plugin")[0];
    var elementWidth = this.HTMLElement.getBoundingClientRect().width
    this.HTMLElement.setAttribute("style", "top: 32%; margin:5%;")
    viewer.plugin.canvas3d.handleResize()
  }

  backClicked() {
    console.log('Clicked back')
    this.router.navigate(['/second-level'], this.wholeData);
  }
  asIsOrder(a, b) {
    return 1;
  }

}
