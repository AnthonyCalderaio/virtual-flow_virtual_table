import { Component, NgZone, OnInit, AfterViewInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import * as molstar from 'src/assets/outsider_projects/molstar/molstar.js';
import { take } from 'rxjs/operators';
import { StoreService } from '../store.service';

@Component({
  selector: 'app-third-level',
  templateUrl: './third-level.component.html',
  styleUrls: ['./third-level.component.css'],
})
export class ThirdLevelComponent implements OnInit, AfterViewInit {
  compound: any;
  protein: any;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private ngZone: NgZone,
    private store: StoreService
  ) {}

  ngOnInit() {
    this.route.params.pipe(take(1)).subscribe((params) => {
      const { proteinId, compoundId } = params;
      this.protein = this.store.data[proteinId];
      this.compound = this.protein.compounds[compoundId];
    });
  }

  ngAfterViewInit(): void {
    this.ngZone.runOutsideAngular(() => {
      this._renderVisualization(this.protein, this.compound);
    });
    document.documentElement.scrollTop = 0;
  }

  private _hexColor(color: string) {
    const r = parseInt(color.substr(1, 2), 16);
    const g = parseInt(color.substr(3, 2), 16);
    const b = parseInt(color.substr(5, 2), 16);
    return ((r << 16) | (g << 8) | b);
  }

  private _renderVisualization(protein: any, compound: any) {
    const viewer = new molstar.DockingViewer('level-3-viewer', [
      // add colors as hex numbers here, one for each protein chain
      this._hexColor(this.protein.color)
    ], true);

    viewer.loadStructuresFromUrlsAndMerge([
      {
        url: `https://virtualflow-covid.hms.harvard.edu/Structures/${protein.inter_screen_id}/Receptor.pdbqt`,
        // url: './assets/sample_urls/Receptor.pdbqt',
        format: 'pdbqt',
      },
      {
        url: `https://virtualflow-covid.hms.harvard.edu/Structures/${protein.inter_screen_id}/Ligands/${compound.compound_screening_id}.mol2`,
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
    return `https://virtualflow-covid.hms.harvard.edu/Structures/${this.protein.inter_screen_id}/Ligands/png/${this.compound.compound_screening_id}.png`;
  }

  get zincUrl() {
    return 'https://zinc15.docking.org/substances/' + this.compound.compound_source_id;
  }

  get zincCompound() {
    return this.compound.compound_source_id.startsWith('ZINC');
  }
}
