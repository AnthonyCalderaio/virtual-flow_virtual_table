import { Component, OnInit, ElementRef, NgZone } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import * as molstar from 'src/assets/outsider_projects/version1/molstar.js';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-third-level',
  templateUrl: './third-level.component.html',
  styleUrls: ['./third-level.component.css']
})
export class ThirdLevelComponent implements OnInit {
  value: string;

  wholeData: any;
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private ngZone: NgZone) {}

  HTMLElement: any;

  ngOnInit(): void {
    this.ngZone.runOutsideAngular(() => {
      // console.log('thirdLevelData(thirdLevel): ', this.thirdLevelData);
      const viewer = new molstar.Viewer('viewer', {
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
      const elementWidth = this.HTMLElement.getBoundingClientRect().width
      this.HTMLElement.setAttribute("style", "top: 32%; margin:5%;")
      viewer.plugin.canvas3d.handleResize()
    });
  }

  backClicked() {
    console.log('Clicked back')
    this.route.params.pipe(take(1)).subscribe((params) => {
      this.router.navigate(['second-level', params.proteinId]);
    });
  }

  asIsOrder(a, b) {
    return 1;
  }

}
