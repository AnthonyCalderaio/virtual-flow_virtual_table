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
      console.log('this.Slogpalphabet: ', this.Slogpalphabet);
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

  // HBAMinValue = this.hydrogenBondAcceptors[0]
  // HBAMaxValue = this.hydrogenBondAcceptors[Object.keys(this.hydrogenBondAcceptors).length - 2]

  // HBASliderOptions: Options = {
  //   floor: Number(this.HBAMinValue),
  //   ceil: this.HBAMaxValue,
  //   stepsArray: [],
  //   showTicksValues: true
  // };

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

    this.changeOptionsForMw()
    this.changeOptionsForSlogP()
    this.changeOptionsForHBA()
    this.changeOptionsForHBD()
    this.changeOptionsForTPSA()
    this.changeOptionsForRotB()

    console.log('alphabet: ', this.alphabet);

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

  backClicked() {
    this.router.navigate(['/first-level'], this.wholeData);
  }

  clickedDockCompound(index: any) {
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
    var compoundValid = true;
    Object.keys(this.wholeData.level2.docked_compounds).forEach(item => {
      compoundValid = true;
      var compoundUnderReview = this.wholeData.level2.docked_compounds[item]
      Object.keys(compoundUnderReview).forEach(compoundDetail => {
        if (this.validFilterKeyNamesForCheck.includes(compoundDetail)) {
          //Checking filter value here
          if (compoundDetail == 'MW') {
            if (!(this.between(compoundUnderReview[compoundDetail], this.mwFilterLow, this.mwFilterHigh))) {
              //between(compoundUnderReview[compoundDetail],this.mwFilterLow,this.mwFilterHigh)
              compoundValid = false;
              console.log('MW Broke!' + compoundUnderReview[compoundDetail] + ' < ' + this.mwFilterLow);
            }
          }
          if (compoundDetail == 'cLogP') {
            if (!(this.between(compoundUnderReview[compoundDetail], this.slogPFilterLow, this.slogPFilterHigh))) {
              compoundValid = false;
              console.log('cLogP Broke!')
            }
          }
          if (compoundDetail == 'H_Acc') {
              if (!(this.between(compoundUnderReview[compoundDetail], this.h_accFilterLow, this.h_accFilterHigh))) {
              console.log('h-acc Broke!')
              compoundValid = false;
            }
          }
          if (compoundDetail == 'hDonors') {
            if (!(compoundUnderReview[compoundDetail] <= this.hbdFilterHigh && this.hbdFilterLow <= compoundUnderReview[compoundDetail])) {
              console.log('hDonors Broke!')
              // console.log('this.hbdFilterHigh: ', this.hbdFilterHigh)
              // console.log('this.hbdFilterLow:  ', this.hbdFilterLow)
              compoundValid = false;
            }
          }
          if (compoundDetail == 'tpsa') {
            if (!(compoundUnderReview[compoundDetail] < this.tpsaFilterHigh && this.tpsaFilterLow < compoundUnderReview[compoundDetail])) {
              console.log('tpsa Broke!')
              compoundValid = false;
            }
          }
          if (compoundDetail == 'rotable_bonds') {
            if (!(compoundUnderReview[compoundDetail] < this.rotBFilterHigh && this.rotBFilterLow < compoundUnderReview[compoundDetail])) {
              console.log('rotable_bonds Broke!')
              compoundValid = false;
            }
          }
        }

      })
      if (!compoundValid) {
        //Mark Invalid
        // console.log('INVALID compoundUnderReview.compound_identifier: ',compoundUnderReview.compound_identifier)
        this.compoundBlacklist.indexOf(compoundUnderReview.compound_identifier) === -1 ? this.compoundBlacklist.push(compoundUnderReview.compound_identifier) : null;
      } else {
        //Mark Valid
        // console.log('VALID compoundUnderReview.compound_identifier: ',compoundUnderReview.compound_identifier)
        this.compoundBlacklist = this.compoundBlacklist.filter(item => { return item != compoundUnderReview.compound_identifier })
      }

    })
    console.log('Blacklst', this.compoundBlacklist)
  }

  lowValueChange(value: any, label: any) {
    console.log('low change:' + value + ' ' + label)
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
    console.log('high change:' + value + ' ' + label)
    // console.log('Well 12 is',this.molecularWeightRanges[12])
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

  changeOptionsForMw() {
    const newOptions: Options = Object.assign({}, this.MWSliderOptions);
    this.MWSliderOptions = newOptions;
  }

  changeOptionsForSlogP() {
    const newOptions: Options = Object.assign({}, this.SlogpSliderOptions);
    this.SlogpSliderOptions = newOptions;
  }

  // changeOptionsForSlogP() {
  //   const slogpOptions: Options = Object.assign({}, this.SlogpSliderOptions);
  //   var SlogpSliderOptionsArray = []
  //   Object.keys(this.partitionCoefficientRanges).forEach(element => {
  //     SlogpSliderOptionsArray.push({ value: this.partitionCoefficientRanges[element] })
  //   });
  //   slogpOptions.stepsArray = SlogpSliderOptionsArray;
  //   this.SlogpSliderOptions = slogpOptions;
  // }


  changeOptionsForTPSA() {
    const newOptions: Options = Object.assign({}, this.TPSASliderOptions);
    this.TPSASliderOptions = newOptions;
  }

  // changeOptionsForTPSA() {
  //   const tpsaOptions: Options = Object.assign({}, this.TPSASliderOptions);
  //   var tpsaSliderOptionsArray = []
  //   Object.keys(this.topologicalPolarSurfaceArea).forEach(element => {
  //     tpsaSliderOptionsArray.push({ value: this.topologicalPolarSurfaceArea[element] })
  //   });
  //   tpsaOptions.stepsArray = tpsaSliderOptionsArray;
  //   this.TPSASliderOptions = tpsaOptions;
  // }

  changeOptionsForHBA() {
    const newOptions: Options = Object.assign({}, this.HBASliderOptions);
    this.HBASliderOptions = newOptions;
  }

  // changeOptionsForHBA() {
  //   const tpsaOptions: Options = Object.assign({}, this.HBASliderOptions);
  //   var hbaSliderOptionsArray = []
  //   Object.keys(this.hydrogenBondAcceptors).forEach(element => {
  //     hbaSliderOptionsArray.push({ value: this.hydrogenBondAcceptors[element] })
  //   });
  //   tpsaOptions.stepsArray = hbaSliderOptionsArray;
  //   this.HBASliderOptions = tpsaOptions;
  // }

  changeOptionsForHBD() {
    const newOptions: Options = Object.assign({}, this.HBDSliderOptions);
    this.HBDSliderOptions = newOptions;
  }

  // changeOptionsForHBD() {
  //   const tpsaOptions: Options = Object.assign({}, this.HBDSliderOptions);
  //   var hbdSliderOptionsArray = []
  //   Object.keys(this.hydrogenBondDonors).forEach(element => {
  //     hbdSliderOptionsArray.push({ value: this.hydrogenBondDonors[element] })
  //   });
  //   tpsaOptions.stepsArray = hbdSliderOptionsArray;
  //   this.HBDSliderOptions = tpsaOptions;
  // }

  changeOptionsForRotB() {
    const newOptions: Options = Object.assign({}, this.rotBSliderOptions);
    this.rotBSliderOptions = newOptions;
  }

  // changeOptionsForRotB() {
  //   const tpsaOptions: Options = Object.assign({}, this.rotBSliderOptions);
  //   var rotBSliderOptionsArray = []
  //   Object.keys(this.rotableBonds).forEach(element => {
  //     rotBSliderOptionsArray.push({ value: this.rotableBonds[element] })
  //   });
  //   tpsaOptions.stepsArray = rotBSliderOptionsArray;
  //   this.rotBSliderOptions = tpsaOptions;
  // }
  changeAllOptions() {
    // this.changeOptionsForMw()
    // this.changeOptionsForSlogP()
    // this.changeOptionsForTPSA()
    // this.changeOptionsForHBA()
    // this.changeOptionsForHBD()
    // this.changeOptionsForRotB()
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
  convertToInfinityOrNot(item: any) {
    if (item == 'infinity') {
      // console.log('returned ' + Number.POSITIVE_INFINITY)
      return Number.POSITIVE_INFINITY
    }
    else if (item == '-infinity') {
      // console.log('Made it here?', item)
      // console.log('returned ' + Number.NEGATIVE_INFINITY)
      return Number.NEGATIVE_INFINITY
    } else {
      console.log('returned ', item)
      return item;
    }
  }
  between(x, min, max) {
    // console.log('is ' + min + ' <' + x + ' < ' + max);
    return x >= min && x <= max;
  }
}
