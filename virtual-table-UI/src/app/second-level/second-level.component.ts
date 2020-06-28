import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import testData from '../testData.json';
import * as NGL from '../../../node_modules/ngl';

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

  molecularWeightRanges = {
    "0":"0",
    "1":"200",
    "2":"250",
    "3":"300",
    "4":"325",
    "5":"350",
    "6":"375",
    "7":'400',
    "8":"425",
    "9":"450",
    "10":"500",
  }

  partitionCoefficientRanges = {
    "0":"-inf",
    "1":"-1",
    "2":"0",
    "3":"1",
    "4":"2",
    "5":"2.5",
    "6":"3",
    "7":"3.5",
    "8":"4",
    "9":"4.5",
    "10":"5",
    "11":"inf"
  }

  topologicalPolarSurfaceArea = {
    "0":"0",
    "1":"20",
    "2":"40",
    "3":"60",
    "4":"80",
    "5":"100",
    "6":"120",
    "7":"140"
  }

  hydrogenBondAcceptors = {
    "0":"0",
    "1":"1",
    "2":"3",
    "3":"5",
    "4":"7",
    "5":"9",
    "6":"10"
  }

  ngOnInit(): void {
    console.log('wholeData(secondLevel): ', this.wholeData);
    this.populateMoleculeViewports()
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

}
