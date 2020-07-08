import { Component, OnInit, ElementRef, NgZone } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import * as molstar from 'src/assets/outsider_projects/version1/molstar.js';
import { take } from 'rxjs/operators';
import realdata from '../wip_realdata.json';

@Component({
  selector: 'app-third-level',
  templateUrl: './third-level.component.html',
  styleUrls: ['./third-level.component.css'],
})
export class ThirdLevelComponent implements OnInit {
  compound: any;
  protein: any;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private ngZone: NgZone
  ) {}

  HTMLElement: any;

  ngOnInit(): void {
    this.ngZone.runOutsideAngular(() => {
      this.route.params.pipe(take(1)).subscribe((params) => {
        const { proteinId, compoundId } = params;
        this.protein = realdata[proteinId];
        this.compound = this.protein.level2.docked_compounds[compoundId];
        this._renderVisualization(this.protein, this.compound);
      });
    });
  }

  private _renderVisualization(protein: any, compound: any) {
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
      {
        url: `https://virtualflow-covid.hms.harvard.edu/Structures/${protein.proteinName}/Receptor.pdbqt`,
        format: 'pdbqt',
      },
      {
        url: `https://virtualflow-covid.hms.harvard.edu/Structures/${protein.proteinName}/Ligands/${compound.Compound_screening_ID}.mol2`,
        format: 'mol2',
      },
    ]);
    this.HTMLElement = document.getElementsByClassName('msp-plugin')[0];
    this.HTMLElement.setAttribute('style', 'top: 32%; margin:5%;');
    viewer.plugin.canvas3d.handleResize();
  }

  backClicked() {
    console.log('Clicked back');
    this.route.params.pipe(take(1)).subscribe((params) => {
      this.router.navigate(['second-level', params.proteinId]);
    });
  }

  get compoundImage() {
    if (!this.protein || !this.compound) {
      return '';
    }
    return `https://virtualflow-covid.hms.harvard.edu/Structures/${this.protein.proteinName}/Ligands/png/${this.compound.Compound_screening_ID}.png`;
  }
}
