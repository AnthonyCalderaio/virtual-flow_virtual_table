import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import testData from '../testData.json';
import * as NGL from '../../../node_modules/ngl';

@Component({
  selector: 'app-first-level',
  templateUrl: './first-level.component.html',
  styleUrls: ['./first-level.component.css']
})
export class FirstLevelComponent implements OnInit {

  constructor(
    private router: Router,
  ) { }

  ngOnInit(): void {
    console.log('WholeDataJson: ', this.testData);
    
      var stage = new NGL.Stage("viewport");

      // Handle window resizing
      window.addEventListener("resize", function (event) {
        stage.handleResize();
      }, false);


      // Load PDB entry 1CRN
      stage.loadFile("rcsb://1crn", { defaultRepresentation: true });
    

    // console.log('proteinData: ',this.proteinData)
  }
  testData: any = testData



  level1Click(item: any) {

    // console.log('Clicked level 1', item);
    // Object.keys(this.proteinData).forEach(item => {
    //   console.log()
    // })
    console.log(this.testData[item.key])
    this.router.navigate(['/second-level'], this.testData[item.key]);
  }
}
