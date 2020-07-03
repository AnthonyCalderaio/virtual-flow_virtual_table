import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import testData from '../testData.json';
import * as NGL from '../../../node_modules/ngl';
import { Options, LabelType, CustomStepDefinition } from 'ng5-slider';

@Component({
  selector: 'app-second-level',
  templateUrl: './second-level.component.html',
  styleUrls: ['./second-level.component.css']
})
export class SecondLevelComponent implements OnInit {

  constructor(
    private _location: Location,
    private router: Router
  ) {
    // console.log(this.router.getCurrentNavigation().extras)
  }
  wholeData = JSON.parse(JSON.stringify(this.router.getCurrentNavigation().extras))
  testData: any = testData

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

  validFilterKeyNamesForCheck = ["MW", "cLogP", "H_Acc", "hDonors", "tpsa", "rotable_bonds"]

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
  mwMaxValue: number = 12;//number = this.molecularWeightRanges[Object.keys(this.molecularWeightRanges).length - 1];


  // MWSliderOptions: Options = {
  //   // floor = //number(this.molecularWeightRanges[0]),
  //   ceil: this.molecularWeightRanges[Object.keys(this.molecularWeightRanges).length - 1],
  //   stepsArray: [
  //     { value: 1, }
  //   ],
  //   showTicksValues: true
  // };
  // this.mwMaxValue = 20;
  // alphabet: string = 'A,B,C,D,E,F,G,H,I,J,K,L,M,N,O,P,Q,R,S,T,U,V,W,X,Y,Infinity';
  // alphabet: string = this.convertOjectToArray(this.molecularWeightRanges).toString()
  alphabet: string = "" + Object.keys(this.molecularWeightRanges).map(item=> {return item})
  // value: number = this.letterToIndex('Z');
  value:11
  MWSliderOptions: Options = {
    // floor:1,
    // ceil:20,
    stepsArray: this.alphabet.split(',').map((letter: string): CustomStepDefinition => {
      // console.log('Item to map:', letter)
      // console.log(this.convertOjectToArray(this.molecularWeightRanges))
      return { value: this.letterToIndex(letter) };
    }),
    translate: (value: number, label: LabelType): string => {
      return this.indexToLetter(value);
    },
    showTicksValues: true
  }

  indexToLetter(index: number): string {
    // index=index-1
    if(this.molecularWeightRanges[index] == undefined){
      index=index-1
    }
    return String(this.molecularWeightRanges[index]);
    // return this.alphabet.replace(/,/g, '')[index];
  }

  letterToIndex(letter: string): number {
    // console.log('want to return string:', this.alphabet.indexOf(letter))
    return this.alphabet.replace(/,/g, '').indexOf(letter);
  }

  //Slogp-----------------------
  partitionCoefficientRanges = {
    "0": Number.NEGATIVE_INFINITY,
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
    "11": Number.POSITIVE_INFINITY
  }

  slogpMinValue = this.partitionCoefficientRanges[1] ? this.partitionCoefficientRanges[0] : Number.NEGATIVE_INFINITY;
  slogpMaxValue: number = this.partitionCoefficientRanges[Object.keys(this.molecularWeightRanges).length - 2];

  SlogpSliderOptions: Options = {
    floor: Number(this.slogpMinValue),
    ceil: this.slogpMaxValue,
    stepsArray: [],
    showTicksValues: true,
  };

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
    "8": Number.POSITIVE_INFINITY
  }
  TPSAMinValue = this.topologicalPolarSurfaceArea[0]
  TPSAMaxValue = this.topologicalPolarSurfaceArea[Object.keys(this.topologicalPolarSurfaceArea).length - 2]
  TPSASliderOptions: Options = {
    floor: 20,
    ceil: 140,
    stepsArray: [],
    showTicksValues: true
  };

  //HBA or H-Acc
  hydrogenBondAcceptors = {
    "0": "0",
    "1": "1",
    "2": "3",
    "3": "5",
    "4": "7",
    "5": "9",
    "6": "10",
    "7": Number.POSITIVE_INFINITY
  }

  HBAMinValue = this.hydrogenBondAcceptors[0]
  HBAMaxValue = this.hydrogenBondAcceptors[Object.keys(this.hydrogenBondAcceptors).length - 2]

  HBASliderOptions: Options = {
    floor: Number(this.HBAMinValue),
    ceil: this.HBAMaxValue,
    stepsArray: [],
    showTicksValues: true
  };

  //HBD
  hydrogenBondDonors = {
    "0": "0",
    "1": "1",
    "2": "2",
    "3": "3",
    "4": "4",
    "5": "5",
    "6": Number.POSITIVE_INFINITY
  }

  hbdMinValue = this.hydrogenBondDonors[0]
  hbdMaxValue = this.hydrogenBondDonors[Object.keys(this.hydrogenBondDonors).length - 2]

  HBDSliderOptions: Options = {
    floor: 1,
    ceil: 4,
    stepsArray: [],
    showTicksValues: true
  };

  //RotB
  rotableBonds = {
    "0": "0",
    "1": "1",
    "2": "3",
    "3": "5",
    "4": "7",
    "5": "9",
    "6": "10",
    "7": Number.POSITIVE_INFINITY
  }

  rotBMinValue = this.rotableBonds[0]
  rotBMaxValue = this.rotableBonds[Object.keys(this.rotableBonds).length - 2]

  rotBSliderOptions: Options = {
    floor: Number(this.rotBMinValue),
    ceil: Number(this.rotBMaxValue),
    stepsArray: [],
    showTicksValues: true
  };

  ngOnInit(): void {
    this.changeAllOptions()
    this.populateMoleculeViewports()
    this.changeOptionsForMw()
    // var stepsArrayToWatch = this.alphabet.split(',').map((letter: string): CustomStepDefinition => {
    //   console.log('Item to map:', letter)
    //   console.log(this.convertOjectToArray(this.molecularWeightRanges))
    //   return { value: this.letterToIndex(letter) };
    // })
    // console.log('alphabet:',this.alphabet)
    // console.log('stepsArrayToWatch: ' + JSON.stringify(stepsArrayToWatch))
    // console.log('Object.keys(this.molecularWeightRanges).map(item=> {return item + })',Object.keys(this.molecularWeightRanges).map(item=> {return item + ','}))
    // this.mwFilterHigh = this.molecularWeightRanges[Object.keys(this.molecularWeightRanges).length - 1]
    // this.slogPFilterHigh = this.partitionCoefficientRanges[Object.keys(this.partitionCoefficientRanges).length - 1]
    // this.tpsaFilterHigh = this.topologicalPolarSurfaceArea[Object.keys(this.topologicalPolarSurfaceArea).length - 1]
    // this.h_accFilterHigh = this.hydrogenBondAcceptors[Object.keys(this.hydrogenBondAcceptors).length - 1]
    // this.hbdFilterHigh = this.hydrogenBondDonors[Object.keys(this.hydrogenBondDonors).length - 1]
    // this.rotBFilterHigh = this.rotableBonds[Object.keys(this.rotableBonds).length - 1]
  }

  backClicked() {
    this.router.navigate(['/first-level'], this.wholeData);
  }

  clickedDockCompound(index: any) {
    // console.log('Index clicked:', index)
    // console.log(this.wholeData.level2.docked_compounds[index])
    this.router.navigate(['/third-level'], this.wholeData);
  }

  populateMoleculeViewports() {
    setTimeout(() => {
      var stage = new NGL.Stage("secondLevelviewport" + '1');
      window.addEventListener("resize", function (event) {
        stage.handleResize();
      }, true);
      stage.loadFile("rcsb://1crn", { defaultRepresentation: true });
    }, 1);
  }

  asIsOrder(a, b) {
    return 1;
  }

  validateCompounds() {
    Object.keys(this.wholeData.level2.docked_compounds).forEach(item => {
      var compoundValid = true;
      var compoundUnderReview = this.wholeData.level2.docked_compounds[item]
      Object.keys(compoundUnderReview).forEach(compoundDetail => {
        if (this.validFilterKeyNamesForCheck.includes(compoundDetail)) {
          //Checking filter value here
          if (compoundDetail == 'MW') {
            // console.log('compoundUnderReview[compoundDetail]:', compoundUnderReview[compoundDetail])
            if (!(compoundUnderReview[compoundDetail] < this.mwFilterHigh && this.mwFilterLow < compoundUnderReview[compoundDetail])) {
              compoundValid = false;
              // console.log('MW Broke!' + compoundUnderReview[compoundDetail] + ' > ' + this.mwFilterHigh);
            }
          }
          if (compoundDetail == 'cLogP') {
            if (!(compoundUnderReview[compoundDetail] < this.slogPFilterHigh && this.slogPFilterLow < compoundUnderReview[compoundDetail])) {
              compoundValid = false;
              // console.log('cLogP Broke!')
            }
          }
          if (compoundDetail == 'H_Acc') {
            if (!(compoundUnderReview[compoundDetail] < this.h_accFilterHigh && this.h_accFilterLow < compoundUnderReview[compoundDetail])) {
              // console.log('h_accFilterHigh: ', this.h_accFilterHigh);
              // console.log('this.h_accFilterLow: ', this.h_accFilterLow);
              // console.log('h-acc Broke!')
              compoundValid = false;
            }
          }
          if (compoundDetail == 'hDonors') {
            if (!(compoundUnderReview[compoundDetail] < this.hbdFilterHigh && this.hbdFilterLow < compoundUnderReview[compoundDetail])) {
              // console.log('h-acc Broke!')
              compoundValid = false;
            }
          }
          if (compoundDetail == 'tpsa') {
            if (!(compoundUnderReview[compoundDetail] < this.tpsaFilterHigh && this.tpsaFilterLow < compoundUnderReview[compoundDetail])) {
              // console.log('tpsa Broke!')
              compoundValid = false;
            }
          }
          if (compoundDetail == 'rotable_bonds') {
            if (!(compoundUnderReview[compoundDetail] < this.rotBFilterHigh && this.rotBFilterLow < compoundUnderReview[compoundDetail])) {
              // console.log('tpsa Broke!')
              compoundValid = false;
            }
          }
        }
      })
      if (!compoundValid) {
        this.compoundBlacklist.indexOf(compoundUnderReview.compound_identifier) === -1 ? this.compoundBlacklist.push(compoundUnderReview.compound_identifier) : null;

      } else {
        this.compoundBlacklist = this.compoundBlacklist.filter(item => { return item != compoundUnderReview.compound_identifier })
      }
      // console.log('Blacklst', this.compoundBlacklist)
    })
  }

  lowValueChange(value: any, label: any) {
    // console.log('low change:' + value + ' ' + label)
    if (label == 'MWSlider') {
      this.mwFilterLow = value;
    }
    if (label == 'SlogP') {
      this.slogPFilterLow = value
    }
    if (label == 'tpsa') {
      this.tpsaFilterLow = value
    }
    if (label == 'h-acc') {
      this.h_accFilterLow = value
    }
    if (label == 'hbd') {
      this.hbdFilterLow = value;
    }
    if (label == 'rotB') {
      this.rotBFilterLow = value;
    }
    this.validateCompounds()
  }

  highValueChange(value: any, label: any) {
    // console.log('high change:' + value + ' ' + label)
    if (label == 'MWSlider') {
      this.mwFilterHigh = value
    }
    if (label == 'SlogP') {
      this.slogPFilterHigh = value
    }
    if (label == 'tpsa') {
      this.tpsaFilterHigh = value
    }
    if (label == 'h-acc') {
      this.h_accFilterHigh = value
    }
    if (label == 'hbd') {
      this.hbdFilterHigh = value;
    }
    if (label == 'rotB') {
      this.rotBFilterHigh = value;
    }
    this.validateCompounds()
  }

  // changeOptionsForMw() {
  //   const newOptions: Options = Object.assign({}, this.MWSliderOptions);
  //   var tstepsArray2 = []
  //   Object.keys(this.molecularWeightRanges).forEach(element => {
  //     tstepsArray2.push({ value: this.molecularWeightRanges[element] })
  //   });
  //   newOptions.stepsArray = tstepsArray2;
  //   this.MWSliderOptions = newOptions;
  // }

  changeOptionsForMw(){
    const newOptions: Options = Object.assign({}, this.MWSliderOptions);
    this.MWSliderOptions = newOptions;
  }

  changeOptionsForSlogP() {
    const slogpOptions: Options = Object.assign({}, this.SlogpSliderOptions);
    var SlogpSliderOptionsArray = []
    Object.keys(this.partitionCoefficientRanges).forEach(element => {
      SlogpSliderOptionsArray.push({ value: this.partitionCoefficientRanges[element] })
    });
    slogpOptions.stepsArray = SlogpSliderOptionsArray;
    this.SlogpSliderOptions = slogpOptions;
  }

  changeOptionsForTPSA() {
    const tpsaOptions: Options = Object.assign({}, this.TPSASliderOptions);
    var tpsaSliderOptionsArray = []
    Object.keys(this.topologicalPolarSurfaceArea).forEach(element => {
      tpsaSliderOptionsArray.push({ value: this.topologicalPolarSurfaceArea[element] })
    });
    tpsaOptions.stepsArray = tpsaSliderOptionsArray;
    this.TPSASliderOptions = tpsaOptions;
  }

  changeOptionsForHBA() {
    const tpsaOptions: Options = Object.assign({}, this.HBASliderOptions);
    var hbaSliderOptionsArray = []
    Object.keys(this.hydrogenBondAcceptors).forEach(element => {
      hbaSliderOptionsArray.push({ value: this.hydrogenBondAcceptors[element] })
    });
    tpsaOptions.stepsArray = hbaSliderOptionsArray;
    this.HBASliderOptions = tpsaOptions;
  }

  changeOptionsForHBD() {
    const tpsaOptions: Options = Object.assign({}, this.HBDSliderOptions);
    var hbdSliderOptionsArray = []
    Object.keys(this.hydrogenBondDonors).forEach(element => {
      hbdSliderOptionsArray.push({ value: this.hydrogenBondDonors[element] })
    });
    tpsaOptions.stepsArray = hbdSliderOptionsArray;
    this.HBDSliderOptions = tpsaOptions;
  }

  changeOptionsForRotB() {
    const tpsaOptions: Options = Object.assign({}, this.rotBSliderOptions);
    var rotBSliderOptionsArray = []
    Object.keys(this.rotableBonds).forEach(element => {
      rotBSliderOptionsArray.push({ value: this.rotableBonds[element] })
    });
    tpsaOptions.stepsArray = rotBSliderOptionsArray;
    this.rotBSliderOptions = tpsaOptions;
  }
  changeAllOptions() {
    // this.changeOptionsForMw()
    this.changeOptionsForSlogP()
    this.changeOptionsForTPSA()
    this.changeOptionsForHBA()
    this.changeOptionsForHBD()
    this.changeOptionsForRotB()
  }
  // convertObjectToString(inputObject) {
  //   var someString = ""
  //   Object.keys(inputObject).forEach(element => {
  //     someString = someString + element + ','
  //   })
  //   console.log('someString:', someString)
  // }

  convertOjectToArray(object: any) {
    var someArray = []
    Object.keys(object).forEach((item) => {
      // console.log('object[item]', object[item])
      someArray.push(String(object[item]))
    })
    // console.log('Returning: ', someArray);
    return someArray;
  }
}
