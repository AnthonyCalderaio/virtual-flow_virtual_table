import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import testData from '../testData_copy.json';
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
        stage.setParameters({ backgroundColor: "white", hoverTimeout: -1 });
        var tooltip = document.createElement("div");
        Object.assign(tooltip.style, {
          display: "none",
          position: "absolute",
          zIndex: 10,
          pointerEvents: "none",
          backgroundColor: "rgba(0, 0, 0, 0.6)",
          color: "lightgrey",
          padding: "0.5em",
          fontFamily: "sans-serif"
        });
        stage.viewer.container.appendChild(tooltip);
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
