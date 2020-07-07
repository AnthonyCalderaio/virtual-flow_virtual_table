import {
  Component,
  OnInit,
  ViewChild,
  NgZone,
  AfterViewInit,
} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { take } from 'rxjs/operators';
import * as NGL from '../../../node_modules/ngl';
import { Options } from 'ng5-slider';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import realdata from '../testData.json'

type ValueTypes =
  | 'MW'
  | 'cLogP'
  | 'h_acc'
  | 'h_donors'
  | 'tpsa'
  | 'Rotatable_Bonds';

@Component({
  selector: 'app-second-level',
  templateUrl: './second-level.component.html',
  styleUrls: ['./second-level.component.css'],
})
export class SecondLevelComponent implements OnInit, AfterViewInit {
  @ViewChild(MatTable) table: MatTable<any>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;

  constructor(private router: Router, private route: ActivatedRoute, private ngZone: NgZone) {}

  initPageSize = 10;

  removedCompounds: any = [];
  dataSource = new MatTableDataSource();

  displayedColumns: string[] = [
    'Compound_screening_ID',
    'docking_score',
    'MW',
    'cLogP',
    'h_acc',
    'h_donors',
    'tpsa',
    'Rotatable_Bonds',
  ];

  validFilterKeyNamesForCheck = new Set([
    'MW',
    'cLogP',
    'h_acc',
    'h_donors',
    'tpsa',
    'Rotatable_Bonds',
  ]);

  compoundBlacklist = [];

  ranges: { [key in ValueTypes]: number[] } = {
    MW: [
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
    cLogP: [
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
    tpsa: [
      0,
      20,
      40,
      60,
      80,
      100,
      120,
      140,
      Number.MAX_SAFE_INTEGER,
    ],
    Rotatable_Bonds: [
      0,
      1,
      3,
      5,
      7,
      9,
      10,
      Number.MAX_SAFE_INTEGER,
    ],
    h_donors: [
      0,
      1,
      2,
      3,
      4,
      5,
      Number.MAX_SAFE_INTEGER,
    ],
    h_acc: [
      0,
      1,
      3,
      5,
      7,
      9,
      10,
      Number.MAX_SAFE_INTEGER,
    ],
  };

  filterValues: { [key in ValueTypes]: { min: number; max: number } } = Object.keys(this.ranges).reduce((accum, key) => {
    accum[key] = {
      min: this.ranges[key][0],
      max: this.ranges[key][this.ranges[key].length - 1]
    };
    return accum;
  }, {} as { [key in ValueTypes]: { min: number; max: number } });

  MWSliderOptions = this.getSliderOptions('MW');
  SlogpSliderOptions = this.getSliderOptions('cLogP');
  TPSASliderOptions = this.getSliderOptions('tpsa');
  HBASliderOptions = this.getSliderOptions('h_acc');
  HBDSliderOptions = this.getSliderOptions('h_donors');
  rotBSliderOptions = this.getSliderOptions('Rotatable_Bonds');

  wholeData: any;

  private dataArray: any = [];

  private getSliderOptions(type: ValueTypes): Options {
    return {
      stepsArray: this.ranges[type].map(c => ({ value: c })),
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
    this.route.params.pipe(
      take(1)
    )
    .subscribe(params => {
      this.wholeData = realdata[params.proteinId];
      this.populateMoleculeViewports();
      this.populateTableData();
      this.dataSource.data = this.dataArray;
      this.dataSource.sort = this.sort;
    });
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator; // For pagination
  }

  clickedRow(event: any) {
    // console.log('Clicked row', event.srcElement.innerText);
    Object.keys(this.wholeData.level2.docked_compounds).forEach((key) => {
      if (
        this.wholeData.level2.docked_compounds[key].compound_screening_ID ==
        event.srcElement.innerText
      ) {
        this.wholeData.objectOfInterest = this.wholeData.level2.docked_compounds[
          key
        ];
        this.router.navigate(['/third-level'], this.wholeData);
      }
    });
  }

  sortData(event: any) {
    // console.log('Sorting for:', event)
  }

  populateTableData() {
    Object.keys(this.wholeData.level2.docked_compounds).forEach((element) => {
      const subSet = this.getSubsetOfObject(
        this.wholeData.level2.docked_compounds[element]
      );
      this.dataArray.push(subSet);
    });
    this.dataSource.data = this.dataArray;
  }

  getSubsetOfObject(objectInput) {
    const {
      compound_screening_ID,
      Top_Scores,
      MW,
      cLogP,
      h_acc,
      h_donors,
      tpsa,
      Rotatable_Bonds,
      docking_score,
    } = objectInput;
    const subset = {
      compound_screening_ID,
      Top_Scores,
      MW,
      cLogP,
      h_acc,
      h_donors,
      tpsa,
      Rotatable_Bonds,
      docking_score,
    };
    return subset;
  }

  backClicked() {
    this.router.navigate(['/first-level']);
  }

  populateMoleculeViewports() {
    this.ngZone.runOutsideAngular(() => {
      setTimeout(() => {
        const stage = new NGL.Stage('secondLevelviewport' + '1');
        stage.setParameters({ backgroundColor: 'white', hoverTimeout: -1 });
        window.addEventListener(
          'resize',
          () => stage.handleResize(),
          true
        );
        stage.loadFile('rcsb://1crn', { defaultRepresentation: true });
      }, 1);
    });
  }

  applyFilter() {
    const keys = Object.keys(this.filterValues);
    this.dataSource.data = this.dataArray.filter(value => {
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
