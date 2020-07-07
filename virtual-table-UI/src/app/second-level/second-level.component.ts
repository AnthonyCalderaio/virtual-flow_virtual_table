import { Component, OnInit, ViewChild, NgZone } from '@angular/core';
import { Location } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
// import testData from '../testData_copy.json';
import * as NGL from '../../../node_modules/ngl';
import { Options, LabelType, CustomStepDefinition } from 'ng5-slider';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-second-level',
  templateUrl: './second-level.component.html',
  styleUrls: ['./second-level.component.css']
})
export class SecondLevelComponent implements OnInit {
  @ViewChild(MatTable) table: MatTable<any>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;

  constructor(
    private _location: Location,
    private router: Router,
    private route: ActivatedRoute,
    private ngZone: NgZone
    // private _bankHttpService: BankHttpService
  ) {
    this.fromLevel1
      = JSON.parse(JSON.stringify(this.router.getCurrentNavigation().extras)) != undefined
        ? JSON.parse(JSON.stringify(this.router.getCurrentNavigation().extras))
        : this.router.getCurrentNavigation().extras
        console.log('From level 1',this.fromLevel1 )
  }
  fromLevel1: any;

  initPageSize = 10
  ELEMENT_DATA_REAL: any = []
  ELEMENT_DATA_REAL_decoy: any = []

  removedCompounds: any = []
  dataSource = new MatTableDataSource();


  displayedColumns: string[] = ['Compound_screening_ID', 'docking_score', 'MW', 'cLogP', "h_acc", "h_donors", "tpsa", "Rotatable_Bonds"];

  wholeData = JSON.parse(JSON.stringify(this.router.getCurrentNavigation().extras))
  // testData: any = testData

  //Filters
  mwFilterHigh: any;
  mwFilterLow: any;

  slogPFilterHigh: any;
  slogPFilterLow: any;

  tpsaFilterHigh: any;
  tpsaFilterLow: any

  h_accFilterLow: any;
  h_accFilterHigh: any;

  hbdFilterLow: any;
  hbdFilterHigh: any;

  rotBFilterHigh: any;
  rotBFilterLow: any;

  validFilterKeyNamesForCheck = ["MW", "cLogP", "h_acc", "h_donors", "tpsa", "Rotatable_Bonds"]

  compoundBlacklist = []

  //MW
  molecularWeightRanges = {
    "0": "0",
    "1": "200",
    "2": "250",
    "3": "300",
    "4": "325",
    "5": "350",
    "6": "375",
    "7": '400',
    "8": "425",
    "9": "450",
    "10": "500",
    "11": "infinity"
  }

  //This is the index of where the two slider points init in the html
  mwMinValue: number = 0;
  mwMaxValue: number = Object.keys(this.molecularWeightRanges).length - 1;

  alphabet: string = "" + Object.keys(this.molecularWeightRanges).map(item => { return item })
  MWSliderOptions: Options = {
    stepsArray: this.alphabet.split(',').map((letter: string): CustomStepDefinition => {
      return { value: Number(letter) };
    }),
    translate: (value: number, label: LabelType): string => {
      return this.indexToLetter(value, this.molecularWeightRanges);
    },
    showTicksValues: true
  }

  indexToLetter(index: number, arrayType: any): string {
    if (arrayType[index] == undefined) {
      index = index - 1
    }
    return String(arrayType[index]);
  }

  letterToIndex(letter: string): number {
    return this.alphabet.replace(/,/g, '').indexOf(letter);
  }

  //Slogp-----------------------
  partitionCoefficientRanges = {
    "0": "-infinity",
    "1": "-1",
    "2": "0",
    "3": "1",
    "4": "2",
    "5": "2.5",
    "6": "3",
    "7": "3.5",
    "8": "4",
    "9": "4.5",
    "10": "5",
    "11": "infinity"
  }

  //This is the index of where the two slider points init in the html
  slogpMinValue: number = 0;
  slogpMaxValue: number = Object.keys(this.partitionCoefficientRanges).length - 1;

  Slogpalphabet: string = "" + Object.keys(this.partitionCoefficientRanges).map(item => { return item })
  SlogpSliderOptions: Options = {
    stepsArray: this.Slogpalphabet.split(',').map((letter: string): CustomStepDefinition => {
      return { value: Number(letter) };
    }),
    translate: (value: number, label: LabelType): string => {
      return this.indexToLetter(value, this.partitionCoefficientRanges);
    },
    showTicksValues: true
  }

  //TPSA
  topologicalPolarSurfaceArea = {
    "0": "0",
    "1": "20",
    "2": "40",
    "3": "60",
    "4": "80",
    "5": "100",
    "6": "120",
    "7": "140",
    "8": "infinity"
  }

  //This is the index of where the two slider points init in the html
  TPSAMinValue: number = 0;
  TPSAMaxValue: number = Object.keys(this.topologicalPolarSurfaceArea).length - 1;

  TPSAalphabet: string = "" + Object.keys(this.topologicalPolarSurfaceArea).map(item => { return item })
  TPSASliderOptions: Options = {
    stepsArray: this.TPSAalphabet.split(',').map((letter: string): CustomStepDefinition => {
      return { value: Number(letter) };
    }),
    translate: (value: number, label: LabelType): string => {
      return this.indexToLetter(value, this.topologicalPolarSurfaceArea);
    },
    showTicksValues: true
  }

  //HBA or H-Acc
  hydrogenBondAcceptors = {
    "0": "0",
    "1": "1",
    "2": "3",
    "3": "5",
    "4": "7",
    "5": "9",
    "6": "10",
    "7": "infinity"
  }

  //This is the index of where the two slider points init in the html
  HBAMinValue: number = 0;
  HBAMaxValue: number = Object.keys(this.hydrogenBondAcceptors).length - 1;

  HBAalphabet: string = "" + Object.keys(this.hydrogenBondAcceptors).map(item => { return item })
  HBASliderOptions: Options = {
    stepsArray: this.HBAalphabet.split(',').map((letter: string): CustomStepDefinition => {
      return { value: Number(letter) };
    }),
    translate: (value: number, label: LabelType): string => {
      return this.indexToLetter(value, this.hydrogenBondAcceptors);
    },
    showTicksValues: true
  }

  //HBD
  hydrogenBondDonors = {
    "0": "0",
    "1": "1",
    "2": "2",
    "3": "3",
    "4": "4",
    "5": "5",
    "6": "infinity"
  }

  //This is the index of where the two slider points init in the html
  hbdMinValue: number = 0;
  hbdMaxValue: number = Object.keys(this.hydrogenBondDonors).length - 1;

  HBDalphabet: string = "" + Object.keys(this.hydrogenBondDonors).map(item => { return item })
  HBDSliderOptions: Options = {
    stepsArray: this.HBDalphabet.split(',').map((letter: string): CustomStepDefinition => {
      return { value: Number(letter) };
    }),
    translate: (value: number, label: LabelType): string => {
      return this.indexToLetter(value, this.hydrogenBondDonors);
    },
    showTicksValues: true
  }

  //RotB
  rotableBonds = {
    "0": "0",
    "1": "1",
    "2": "3",
    "3": "5",
    "4": "7",
    "5": "9",
    "6": "10",
    "7": "infinity"
  }

  //This is the index of where the two slider points init in the html
  rotBMinValue: number = 0;
  rotBMaxValue: number = Object.keys(this.rotableBonds).length - 1;

  rotBalphabet: string = "" + Object.keys(this.rotableBonds).map(item => { return item })
  rotBSliderOptions: Options = {
    stepsArray: this.rotBalphabet.split(',').map((letter: string): CustomStepDefinition => {
      return { value: Number(letter) };
    }),
    translate: (value: number, label: LabelType): string => {
      return this.indexToLetter(value, this.rotableBonds);
    },
    showTicksValues: true
  }

  ngOnInit(): void {
    this.changeAllOptions()
    this.populateMoleculeViewports()
    this.initializeFilterBounds()
    this.populateTableData()
    this.dataSource.data = this.ELEMENT_DATA_REAL;
    this.dataSource.sort = this.sort;
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator; // For pagination
  }

  clickedRow(event: any) {
    // console.log('Clicked row', event.srcElement.innerText);
    Object.keys(this.wholeData.level2.docked_compounds).forEach(key => {
      if (this.wholeData.level2.docked_compounds[key].compound_screening_ID == event.srcElement.innerText) {
        this.wholeData['objectOfInterest'] = this.wholeData.level2.docked_compounds[key]
          this.router.navigate(['/third-level'],this.wholeData);
      }
    })
  }


  sortData(event: any) {
    // console.log('Sorting for:', event)
  }

  populateTableData() {
    Object.keys(this.wholeData.level2.docked_compounds).forEach(element => {
      var subSet = this.getSubsetOfObject(this.wholeData.level2.docked_compounds[element])
      this.ELEMENT_DATA_REAL.push(subSet)
      this.ELEMENT_DATA_REAL_decoy.push(subSet)
    })
    this.dataSource.data = this.ELEMENT_DATA_REAL
  }

  getSubsetOfObject(objectInput) {
    let { compound_screening_ID, Top_Scores, MW, cLogP, h_acc, h_donors, tpsa, Rotatable_Bonds, docking_score, ...partialObject } = objectInput;
    let subset = { compound_screening_ID, Top_Scores, MW, cLogP, h_acc, h_donors, tpsa, Rotatable_Bonds, docking_score };
    return subset
  }

  backClicked() {
    this.router.navigate(['/first-level'], this.wholeData);
  }

  // clickedDockCompound(index: any) {
  //   console.log('clicked docked compund')
  //   this.router.navigate(['/third-level'], this.wholeData);
  // }

  populateMoleculeViewports() {
    this.ngZone.runOutsideAngular(() => {
      setTimeout(() => {
        var stage = new NGL.Stage("secondLevelviewport" + '1');
        stage.setParameters({ backgroundColor: "white", hoverTimeout: -1 });
        window.addEventListener("resize", function (event) {
          stage.handleResize();
        }, true);
        stage.loadFile("rcsb://1crn", { defaultRepresentation: true });
      }, 1);
    });
  }

  asIsOrder(a, b) {
    return 1;
  }

  validateCompounds() {
    var compoundValid = true;
    Object.keys(this.wholeData.level2.docked_compounds).forEach(item => {
      compoundValid = true;
      var compoundUnderReview = this.wholeData.level2.docked_compounds[item]
      Object.keys(compoundUnderReview).forEach(compoundDetail => {
        if (this.validFilterKeyNamesForCheck.includes(compoundDetail)) {
          //Checking filter value here
          if (compoundDetail == 'MW') {
            if (!(this.between(compoundUnderReview[compoundDetail], this.mwFilterLow, this.mwFilterHigh))) {
              compoundValid = false;
            }
          }
          if (compoundDetail == 'cLogP') {
            if (!(this.between(compoundUnderReview[compoundDetail], this.slogPFilterLow, this.slogPFilterHigh))) {
              compoundValid = false;
            }
          }
          if (compoundDetail == 'h_acc') {
            if (!(this.between(compoundUnderReview[compoundDetail], this.h_accFilterLow, this.h_accFilterHigh))) {
              compoundValid = false;
            }
          }
          if (compoundDetail == 'h_donors') {
            if (!(this.between(compoundUnderReview[compoundDetail], this.hbdFilterLow, this.hbdFilterHigh))) {
              compoundValid = false;
            }
          }
          if (compoundDetail == 'tpsa') {
            if (!(this.between(compoundUnderReview[compoundDetail], this.tpsaFilterLow, this.tpsaFilterHigh))) {
              compoundValid = false;
            }
          }
          if (compoundDetail == 'Rotatable_Bonds') {
            if (!(this.between(compoundUnderReview[compoundDetail], this.rotBFilterLow, this.rotBFilterHigh))) {
              compoundValid = false;
            }
          }
        }
      })
      if (!compoundValid) {
        //Mark Invalid
        this.compoundBlacklist.indexOf(compoundUnderReview.CompoudBaseID) === -1 ? this.compoundBlacklist.push(compoundUnderReview.CompoudBaseID) : null;
      } else {
        //Mark Valid
        this.compoundBlacklist = this.compoundBlacklist.filter(item => { return item != compoundUnderReview.CompoudBaseID })
      }
    })

    // console.log('Blacklst', this.compoundBlacklist)
  }

  updateTableDataFromBlackList(compoundUnderReview) {
    this.ELEMENT_DATA_REAL = this.ELEMENT_DATA_REAL_decoy
    Object.keys(this.ELEMENT_DATA_REAL).forEach(element => {
      if (this.compoundBlacklist.includes(this.ELEMENT_DATA_REAL[element].CompoudBaseID)) {
        delete this.ELEMENT_DATA_REAL[element]
      }
    });
  }

  lowValueChange(value: any, label: any) {
    if (label == 'MWSlider') {
      this.mwFilterLow = this.convertToInfinityOrNot(this.molecularWeightRanges[value]);
    }
    if (label == 'SlogP') {
      this.slogPFilterLow = this.convertToInfinityOrNot(this.partitionCoefficientRanges[value])
    }
    if (label == 'tpsa') {
      this.tpsaFilterLow = this.convertToInfinityOrNot(this.topologicalPolarSurfaceArea[value])
    }
    if (label == 'h-acc') {
      this.h_accFilterLow = this.convertToInfinityOrNot(this.hydrogenBondAcceptors[value])
    }
    if (label == 'hbd') {
      this.hbdFilterLow = this.convertToInfinityOrNot(this.hydrogenBondDonors[value])
    }
    if (label == 'rotB') {
      this.rotBFilterLow = this.convertToInfinityOrNot(this.rotableBonds[value])
    }
    this.validateCompounds()
  }

  highValueChange(value: any, label: any) {
    if (label == 'MWSlider') {
      this.mwFilterHigh = this.convertToInfinityOrNot(this.molecularWeightRanges[value])
    }
    if (label == 'SlogP') {
      this.slogPFilterHigh = this.convertToInfinityOrNot(this.partitionCoefficientRanges[value])
    }
    if (label == 'tpsa') {
      this.tpsaFilterHigh = this.convertToInfinityOrNot(this.topologicalPolarSurfaceArea[value])
    }
    if (label == 'h-acc') {
      this.h_accFilterHigh = this.convertToInfinityOrNot(this.hydrogenBondAcceptors[value])
    }
    if (label == 'hbd') {
      this.hbdFilterHigh = this.convertToInfinityOrNot(this.hydrogenBondDonors[value])
    }
    if (label == 'rotB') {
      this.rotBFilterHigh = this.convertToInfinityOrNot(this.rotableBonds[value])
    }
    // var t0 = performance.now()
    this.validateCompounds()
    // var t1 = performance.now()
    // console.log("Call to validateCompounds took " + (t1 - t0) + " milliseconds.")
  }

  changeOptionsForMw() {
    const newOptions: Options = Object.assign({}, this.MWSliderOptions);
    this.MWSliderOptions = newOptions;
  }

  changeOptionsForSlogP() {
    const newOptions: Options = Object.assign({}, this.SlogpSliderOptions);
    this.SlogpSliderOptions = newOptions;
  }

  changeOptionsForTPSA() {
    const newOptions: Options = Object.assign({}, this.TPSASliderOptions);
    this.TPSASliderOptions = newOptions;
  }

  changeOptionsForHBA() {
    const newOptions: Options = Object.assign({}, this.HBASliderOptions);
    this.HBASliderOptions = newOptions;
  }

  changeOptionsForHBD() {
    const newOptions: Options = Object.assign({}, this.HBDSliderOptions);
    this.HBDSliderOptions = newOptions;
  }

  changeOptionsForRotB() {
    const newOptions: Options = Object.assign({}, this.rotBSliderOptions);
    this.rotBSliderOptions = newOptions;
  }

  changeAllOptions() {
    this.changeOptionsForMw()
    this.changeOptionsForSlogP()
    this.changeOptionsForHBA()
    this.changeOptionsForHBD()
    this.changeOptionsForTPSA()
    this.changeOptionsForRotB()
  }

  convertOjectToArray(object: any) {
    var someArray = []
    Object.keys(object).forEach((item) => {
      someArray.push(String(object[item]))
    })
    return someArray;
  }
  convertToInfinityOrNot(item: any) {
    if (item == 'infinity') {
      return Number.POSITIVE_INFINITY
    }
    else if (item == '-infinity') {
      return Number.NEGATIVE_INFINITY
    } else {
      return item;
    }
  }
  between(x, min, max) {
    return x >= min && x <= max;
  }
  initializeFilterBounds() {
    this.mwFilterHigh = this.convertToInfinityOrNot(this.molecularWeightRanges[Object.keys(this.molecularWeightRanges).length - 1])//this.molecularWeightRanges[Object.keys(this.molecularWeightRanges).length - 1]
    this.mwFilterLow = this.convertToInfinityOrNot(this.molecularWeightRanges[0])

    this.slogPFilterHigh = this.convertToInfinityOrNot(this.partitionCoefficientRanges[Object.keys(this.partitionCoefficientRanges).length - 1])
    this.slogPFilterLow = this.convertToInfinityOrNot(this.partitionCoefficientRanges[0])

    this.tpsaFilterHigh = this.convertToInfinityOrNot(this.topologicalPolarSurfaceArea[Object.keys(this.topologicalPolarSurfaceArea).length - 1])
    this.tpsaFilterLow = this.convertToInfinityOrNot(this.topologicalPolarSurfaceArea[0])

    this.h_accFilterHigh = this.convertToInfinityOrNot(this.hydrogenBondAcceptors[Object.keys(this.hydrogenBondAcceptors).length - 1])
    this.h_accFilterLow = this.convertToInfinityOrNot(this.hydrogenBondAcceptors[0])

    this.hbdFilterHigh = this.convertToInfinityOrNot(this.hydrogenBondDonors[Object.keys(this.hydrogenBondDonors).length - 1])
    this.hbdFilterLow = this.convertToInfinityOrNot(this.hydrogenBondDonors[0])

    this.rotBFilterHigh = this.convertToInfinityOrNot(this.rotableBonds[Object.keys(this.rotableBonds).length - 1])
    this.rotBFilterLow = this.convertToInfinityOrNot(this.rotableBonds[0])
  }

  handlePage(input: any) {
  }


}