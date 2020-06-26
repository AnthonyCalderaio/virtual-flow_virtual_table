import { Component, OnInit } from '@angular/core';
import testData from '../testData.json';
import * as NGL from '../../../node_modules/ngl';

@Component({
  selector: 'app-ligand-detail',
  templateUrl: './ligand-detail.component.html',
  styleUrls: ['./ligand-detail.component.css']
})
export class LigandDetailComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    this.populateMoleculeViewports()
  }

  testData: any = testData

  populateMoleculeViewports() {
   
        var stage = new NGL.Stage("viewport1");
        window.addEventListener("resize", function (event) {
          stage.handleResize();
        }, true);
        stage.loadFile("rcsb://1crn", { defaultRepresentation: true });
  }

}
