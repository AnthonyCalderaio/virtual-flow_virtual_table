import {
  Component,
  ViewChild,
  NgZone,
  AfterViewInit,
  OnInit,
} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { take } from 'rxjs/operators';
import * as molstar from 'src/assets/outsider_projects/molstar/molstar.js';
import { Options } from 'ng5-slider';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { StoreService } from '../store.service';

type ValueTypes =
  | 'mw'
  | 'c_log_p'
  | 'h_acc'
  | 'h_donors'
  | 'tpsa'
  | 'rotatable_bonds';

@Component({
  selector: 'app-second-level',
  templateUrl: './second-level.component.html',
  styleUrls: ['./second-level.component.css'],
})
export class SecondLevelComponent implements AfterViewInit, OnInit {
  @ViewChild(MatTable) table: MatTable<any>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private ngZone: NgZone,
    private store: StoreService
  ) {}

  inter_screen_idFromLevel1: string;
  initPageSize = 10;

  removedCompounds: any = [];
  dataSource = new MatTableDataSource();

  displayedColumns: string[] = [
    'compound_source_id',
    'compound_screening_id',
    'docking_score',
    'mw',
    'c_log_p',
    'h_acc',
    'h_donors',
    'tpsa',
    'rotatable_bonds',
  ];

  validFilterKeyNamesForCheck = new Set([
    'mw',
    'c_log_p',
    'h_acc',
    'h_donors',
    'tpsa',
    'rotatable_bonds',
  ]);

  ranges: { [key in ValueTypes]: number[] } = {
    mw: [
      0,
      200,
      250,
      300,
      325,
      350,
      375,
      400,
      425,
      450,
      500,
      Number.MAX_SAFE_INTEGER,
    ],
    c_log_p: [
      Number.MIN_SAFE_INTEGER,
      -1,
      0,
      1,
      2,
      2.5,
      3,
      3.5,
      4,
      4.5,
      5,
      Number.MAX_SAFE_INTEGER,
    ],
    tpsa: [0, 20, 40, 60, 80, 100, 120, 140, Number.MAX_SAFE_INTEGER],
    rotatable_bonds: [0, 1, 3, 5, 7, 9, 10, Number.MAX_SAFE_INTEGER],
    h_donors: [0, 1, 2, 3, 4, 5, Number.MAX_SAFE_INTEGER],
    h_acc: [0, 1, 3, 5, 7, 9, 10, Number.MAX_SAFE_INTEGER],
  };

  filterValues: {
    [key in ValueTypes]: { min: number; max: number };
  } = Object.keys(this.ranges).reduce((accum, key) => {
    accum[key] = {
      min: this.ranges[key][0],
      max: this.ranges[key][this.ranges[key].length - 1],
    };
    return accum;
  }, {} as { [key in ValueTypes]: { min: number; max: number } });

  MWSliderOptions = this.getSliderOptions('mw');
  SlogpSliderOptions = this.getSliderOptions('c_log_p');
  TPSASliderOptions = this.getSliderOptions('tpsa');
  HBASliderOptions = this.getSliderOptions('h_acc');
  HBDSliderOptions = this.getSliderOptions('h_donors');
  rotBSliderOptions = this.getSliderOptions('rotatable_bonds');

  proteinData: any;

  private dataArray: any = [];

  private getSliderOptions(type: ValueTypes): Options {
    return {
      stepsArray: this.ranges[type].map((c) => ({ value: c })),
      translate(value: number) {
        if (value === Number.MAX_SAFE_INTEGER) {
          return 'Infinity';
        }
        if (value === Number.MIN_SAFE_INTEGER) {
          return '-Infinity';
        }
        return value.toString();
      },
      showTicksValues: true,
    };
  }

  ngOnInit(): void {
    this.route.params.pipe(take(1)).subscribe((params) => {
      this.proteinData = this.store.data[params.proteinId];
      this.populateTableData();
      this.dataSource.data = this.dataArray;
      this.dataSource.sort = this.sort;
    });
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator; // For pagination
    this.ngZone.runOutsideAngular(() => {
      this.populateMoleculeViewports();
    });
  }

  clickedRow(_: any, row: any) {
    const compounds = this.proteinData.compounds;
    const key = Object.keys(compounds)
      .filter(
        (k) => compounds[k].compound_screening_id === row.compound_screening_id
      )
      .pop();
    this.route.params.pipe(take(1)).subscribe((params) => {
      this.router.navigate(['/third-level', params.proteinId, key]);
    });
  }

  populateTableData() {
    Object.keys(this.proteinData.compounds).forEach((compound) => {
      this.dataArray.push(this.proteinData.compounds[compound]);
    });
    this.dataSource.data = this.dataArray;
  }

  backClicked() {
    // this.router.navigate(['/first-level']);
    window.location.href = 'https://vf4covid19.hms.harvard.edu/';
  }

  private _hexColor(color: string) {
    const r = parseInt(color.substr(1, 2), 16);
    const g = parseInt(color.substr(3, 2), 16);
    const b = parseInt(color.substr(5, 2), 16);
    return ((r << 16) | (g << 8) | b);
  }

  populateMoleculeViewports() {
    const viewer = new molstar.DockingViewer(
      'level-2-viewer',
      [
        // add colors as hex numbers here, one for each protein chain
        this._hexColor(this.proteinData.color)
      ],
      false
    );

    viewer.loadStructuresFromUrlsAndMerge([
      {
        url: `https://virtualflow-covid.hms.harvard.edu/Structures/${this.proteinData.inter_screen_id}/Receptor.pdbqt`,
        // url: './assets/sample_urls/Receptor.pdbqt',
        format: 'pdbqt',
      },
    ]);
    viewer.plugin.behaviors.canvas3d.initialized.subscribe(() => {
      viewer.plugin.canvas3d.handleResize();
    });
  }

  applyFilter() {
    const keys = Object.keys(this.filterValues);
    this.dataSource.data = this.dataArray.filter((value) => {
      for (const key of keys) {
        if (value[key] === undefined) {
          return true;
        }
        const numeric = parseInt(value[key], 10);
        const bounds = this.filterValues[key];
        if (numeric < bounds.min || numeric > bounds.max) {
          return false;
        }
      }
      return true;
    });
  }
}
