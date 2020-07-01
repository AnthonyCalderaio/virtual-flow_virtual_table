import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import testData from '../testData.json';
import * as NGL from '../../../node_modules/ngl';
import noUiSlider from 'nouislider';
// import 'nouislider/distribute/nouislider.css';
import { Ng5SliderModule, Options } from 'ng5-slider';






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

  infinityVar = Number.POSITIVE_INFINITY;
  painted = true;

  mwLow = 0;
  slogPHigh = 10;
  slogPLow = 0;

  simpleSliderValue: number = 200;
  simpleSliderOptions: Options = {
    floor: 0,
    ceil: Infinity
  };



  slogPSliderOptions: Options = {
    floor: 0,
    ceil: 10
  }

  someRange = 40;

  wholeData = JSON.parse(JSON.stringify(this.router.getCurrentNavigation().extras))
  testData: any = testData

  //Filter Maxes
  // mwFilterMax: any;
  slogPFilterMax: any;
  tpsaFilterMax: any;
  h_accFilterMax: any;
  hbdFilterMax: any;
  rotBFilterMax: any;

  //Filter Mins
  mwFilterMin: any;
  slogPFilterMin

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
    "11": Number.POSITIVE_INFINITY
  }
  dynamicCeilingMW = this.lastValueIsInfinity(this.molecularWeightRanges) ? Number(this.molecularWeightRanges[this.turnObjectToArray(this.molecularWeightRanges).length - 2]) + 1 : this.molecularWeightRanges[this.turnObjectToArray(this.molecularWeightRanges).length - 1]

  mwSliderOptions: Options = {
    floor: 0,
    ceil: this.dynamicCeilingMW
  }
  mwMaxed = false;


  mwFilterMax = this.lastValueIsInfinity(this.molecularWeightRanges) ? Number(this.molecularWeightRanges[this.turnObjectToArray(this.molecularWeightRanges).length - 2]) + 1 : this.molecularWeightRanges[this.turnObjectToArray(this.molecularWeightRanges).length - 1]

  //Slogp
  partitionCoefficientRanges = {
    "0": "-inf",
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
    "11": "inf"
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
    "8": Number.POSITIVE_INFINITY
  }

  //HBA or H-Acc
  hydrogenBondAcceptors = {
    "0": "0",
    "1": "1",
    "2": "3",
    "3": "5",
    "4": "7",
    "5": "9",
    "6": "10"
  }

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


  ngOnInit(): void {
    // console.log('what dis?',this.getObjectKeyAtIndex(this.molecularWeightRanges, 10))
    this.populateMoleculeViewports()

    //Filter Maxes set
    this.mwFilterMax = this.molecularWeightRanges[Object.keys(this.molecularWeightRanges).length - 1]
    this.slogPFilterMax = this.partitionCoefficientRanges[Object.keys(this.partitionCoefficientRanges).length - 1]
    this.tpsaFilterMax = this.topologicalPolarSurfaceArea[Object.keys(this.topologicalPolarSurfaceArea).length - 1]
    this.h_accFilterMax = this.hydrogenBondAcceptors[Object.keys(this.hydrogenBondAcceptors).length - 1]
    this.hbdFilterMax = this.hydrogenBondDonors[Object.keys(this.hydrogenBondDonors).length - 1]
    this.rotBFilterMax = this.rotableBonds[Object.keys(this.rotableBonds).length - 1]

    //Filter Mins set
    this.mwFilterMin = this.molecularWeightRanges[0]
    this.slogPFilterMin = this.partitionCoefficientRanges[0]

    // console.log('POSITIVE_INFINITY.:', Number.POSITIVE_INFINITY)


  }

  backClicked() {
    console.log('Clicked back')
    this.router.navigate(['/first-level'], this.wholeData);
  }

  clickedDockCompound(index: any) {
    console.log('Index clicked:', index)
    console.log(this.wholeData.level2.docked_compounds[index])
    this.router.navigate(['/third-level'], this.wholeData);
  }

  populateMoleculeViewports() {
    setTimeout(() => {
      // Object.keys(this.wholeData).forEach(item => {
      // console.log('item: ',item)
      var stage = new NGL.Stage("secondLevelviewport" + '1');
      window.addEventListener("resize", function (event) {
        stage.handleResize();
      }, true);
      stage.loadFile("rcsb://1crn", { defaultRepresentation: true });
      // })
    }, 1);
  }

  asIsOrder(a, b) {
    return 1;
  }

  onSliderChange(input: any, filterName?: any) {
    if (filterName == 'MWSlider') {
      this.mwFilterMin = input
    }
    if (filterName == 'SlogP') {
      // this.slogPFilterMax = this.partitionCoefficientRanges[Number(input.value) - 1];
      this.slogPFilterMin = input;
    }
    if (filterName == 'tpsa') {
      this.tpsaFilterMax = this.topologicalPolarSurfaceArea[Number(input.value) - 1];
    }
    if (filterName == 'h-acc') {
      this.h_accFilterMax = this.hydrogenBondAcceptors[Number(input.value) - 1];
    }
    if (filterName == 'hbd') {
      this.hbdFilterMax = this.hydrogenBondDonors[Number(input.value) - 1];
    }
    if (filterName == 'rotB') {
      this.rotBFilterMax = this.rotableBonds[Number(input.value) - 1];
    }
    this.validateCompounds()
  }

  validateCompounds() {
    Object.keys(this.wholeData.level2.docked_compounds).forEach(item => {
      var compoundValid = true;
      var compoundUnderReview = this.wholeData.level2.docked_compounds[item]
      Object.keys(compoundUnderReview).forEach(compoundDetail => {
        //mw,cLog,etc

        if (this.validFilterKeyNamesForCheck.includes(compoundDetail)) {
          //Checking filter value here
          if (compoundDetail == 'MW') {
            // console.log('compoundUnderReview[compoundDetail]: ', compoundUnderReview[compoundDetail])
            // console.log('this.mwFilterMin: ', this.mwFilterMin);
            // console.log('this.mwFilterMax: ', this.mwFilterMax);
            if (compoundUnderReview[compoundDetail] > this.mwFilterMax || this.mwFilterMin > compoundUnderReview[compoundDetail]) {
              compoundValid = false;
              // console.log('MW Broke!' + compoundUnderReview[compoundDetail] + ' > ' + this.mwFilterMax);
            }
          }
          if (compoundDetail == 'cLogP') {
            if (compoundUnderReview[compoundDetail] > this.slogPFilterMax || this.slogPFilterMin > compoundUnderReview[compoundDetail]) {
              compoundValid = false;
              // console.log('cLogP Broke!')
            }
          }
          if (compoundDetail == 'H_Acc') {
            if (compoundUnderReview[compoundDetail] > this.h_accFilterMax) {
              console.log('this.h_accFilterMax: ' + this.h_accFilterMax)
              // console.log('h-acc Broke!')
              compoundValid = false;
            }
          }
          if (compoundDetail == 'hDonors') {
            if (compoundUnderReview[compoundDetail] > this.hbdFilterMax) {
              // console.log('h-acc Broke!')
              compoundValid = false;
            }
          }
          if (compoundDetail == 'tpsa') {
            if (compoundUnderReview[compoundDetail] > this.tpsaFilterMax) {
              // console.log('tpsa Broke!')
              compoundValid = false;
            }
          }
          if (compoundDetail == 'rotable_bonds') {
            if (compoundUnderReview[compoundDetail] > this.rotBFilterMax) {
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
      console.log('Blacklst', this.compoundBlacklist)
    })
  }
  changeHighVal(value: any, label: string) {
    // console.log('here????',)
    console.log('Value:', value);
    // console.log('label:', label);
    if (label == 'mw') {
      // console.log('Changing!')
      if (this.lastValueIsInfinity(this.molecularWeightRanges)) {
        console.log('Number(this.molecularWeightRanges[Object.keys(this.molecularWeightRanges).length] - 2)', Number(this.molecularWeightRanges[Object.keys(this.molecularWeightRanges).length - 2]))
        if (value > Number(this.molecularWeightRanges[Object.keys(this.molecularWeightRanges).length - 2])) {
          console.log('Got here!')

          // setTimeout(() => {
          this.mwFilterMax = Number.POSITIVE_INFINITY


          // this.mwSliderOptions = {
          //   floor: 0,
          //   ceil: Number.POSITIVE_INFINITY
          // } as Options;

          

         
          }, 100);




          console.log('DONE')
          // }, 10);

          console.log('Number to pass:', Number(this.molecularWeightRanges[Object.keys(this.molecularWeightRanges).length - 2]));
          console.log('mwFilterMax NOW??', this.mwFilterMax)
        }
        this.mwMaxed = false;
      }
      this.mwFilterMax = this.molecularWeightRanges[Object.keys(this.molecularWeightRanges).length - 1] == Infinity ? Infinity : value;
      // console.log('this.mwFilterMax inf??', this.mwFilterMax);
    }
    if (label == 'SlogP') {
      // console.log('Changing!')
      this.slogPFilterMax = value;
    }
  }
  changeLowVal(value: any, label: string) {
    if (label == 'mw') {
      // console.log('Changing!')
      this.mwFilterMin = value;
    }



    // if()

  }
  turnObjectToArray(objectToTransform: any) {
    return Object.keys(objectToTransform)
  }

  lastValueIsInfinity(object: any): boolean {
    if (this.molecularWeightRanges[Number(this.turnObjectToArray(object)[this.turnObjectToArray(object).length - 1])] === Infinity) {
      return true
    } else {
      // console.log('Heres why',this.molecularWeightRanges[Number(this.turnObjectToArray(object)[this.turnObjectToArray(object).length - 1])])
      return false
    }
  }

  // getObjectKeyAtIndex(object:any, index:number){
  //   console.log('ONJHJKH ',Object.keys(object))
  //   return Object.keys(object)[index]
  // }

}
