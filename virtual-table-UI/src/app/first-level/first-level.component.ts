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

  testData: any = testData

  ngOnInit(): void {
    console.log('WholeDataJson: ', this.testData);
    this.populateMoleculeViewports()

  }

  populateMoleculeViewports() {
    setTimeout(() => {
      Object.keys(this.testData).forEach(item => {
        var stage = new NGL.Stage("viewport" + item);
        window.addEventListener("resize", function (event) {
          stage.handleResize();
        }, true);
        stage.loadFile("rcsb://1crn", { defaultRepresentation: true });
      })
    }, 1);
  }

  level1Click(item: any) {
    console.log(this.testData[item.key])
    this.router.navigate(['/second-level'], this.testData[item.key]);
  }
}
