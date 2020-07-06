import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import testData from '../testData_copy.json';
import * as NGL from '../../../node_modules/ngl';
import realdata from '../realdata.json'

@Component({
  selector: 'app-first-level',
  templateUrl: './first-level.component.html',
  styleUrls: ['./first-level.component.css']
})
export class FirstLevelComponent implements OnInit {

  constructor(
    private router: Router) { }

  testData: any = testData
  realdata: any = realdata;

  ngOnInit(): void {
    console.log('WholeDataJson: ', this.testData);
    this.populateMoleculeViewports()
  }

  populateMoleculeViewports() {
    setTimeout(() => {
      Object.keys(this.realdata).forEach(item => {
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
        var url = 'https://virtualflow-covid.hms.harvard.edu/Structures/' + this.realdata[item].protein_name + '/Receptor.pdb'
        console.log('Url for protein pic:', url)
        stage.loadFile(url, { defaultRepresentation: true })
        // stage.loadFile(this.realdata[item].metadata.pdb_url, { defaultRepresentation: true });
        // stage.loadFile("http://files.rcsb.org/download/5IOS.pdb", { defaultRepresentation: true });
      })
    }, 1);
  }

  level1Click(item: any) {
    this.router.navigate(['/second-level'], this.realdata[item.key]);
  }
}
