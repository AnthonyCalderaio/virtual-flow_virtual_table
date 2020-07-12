import { Component, NgZone, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import * as molstar from 'src/assets/outsider_projects/molstar/molstar.js';
import { take } from 'rxjs/operators';
import realdata from '../wip_realdata.json';

@Component({
  selector: 'app-third-level',
  templateUrl: './third-level.component.html',
  styleUrls: ['./third-level.component.css'],
})
export class ThirdLevelComponent implements OnInit
{
  compound: any;
  protein: any;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private ngZone: NgZone
  ) {}

  ngOnInit(): void {
    this.ngZone.runOutsideAngular(() => {
      this.route.params.pipe(take(1)).subscribe((params) => {
        const { proteinId, compoundId } = params;
        this.protein = realdata[proteinId];
        this.compound = this.protein.level2.docked_compounds[compoundId];
        this._renderVisualization(this.protein, this.compound);
      });
    });
    document.documentElement.scrollTop = 0;
  }

  private _renderVisualization(protein: any, compound: any) {
    const viewer = new molstar.DockingViewer('viewer', [
      // add colors as hex numbers here, one for each protein chain
      0x33DD22,
      0x1133EE
    ], true);

    viewer.loadStructuresFromUrlsAndMerge([
      {
        url: `https://virtualflow-covid.hms.harvard.edu/Structures/${protein.proteinName}/Receptor.pdbqt`,
        // url: './assets/sample_urls/Receptor.pdbqt',
        format: 'pdbqt',
      },
      {
        url: `https://virtualflow-covid.hms.harvard.edu/Structures/${protein.proteinName}/Ligands/${compound.Compound_screening_ID}.mol2`,
        // url: './assets/sample_urls/Ligand.mol2',
        format: 'mol2',
      },
    ]);
    viewer.plugin.behaviors.canvas3d.initialized.subscribe(() => {
      viewer.plugin.canvas3d.handleResize();
    });
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

  get zincUrl() {
    return 'https://zinc15.docking.org/substances/' + this.compound.Compound_source_ID;
  }

  get zincCompound() {
    return this.compound.Compound_source_ID.startsWith('ZINC');
  }

  get vendorUrl() {
    if (this.zincCompound) {
      return this.zincUrl;
    }
  }

  get vendorLabel() {
    if (this.zincCompound) {
      return 'See ZINC 15 database';
    }
  }
}
