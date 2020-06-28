import { Component, OnInit, Inject } from '@angular/core';
import testData from '../testData.json';
import * as NGL from '../../../node_modules/ngl';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-ligand-detail',
  templateUrl: './ligand-detail.component.html',
  styleUrls: ['./ligand-detail.component.css']
})
export class LigandDetailComponent implements OnInit {

  constructor(@Inject(DOCUMENT) private document: any) { }
  elem;

  allComplete: boolean = false;

  //CheckBoxes
  water = false;
  ions = false;
  hydrogens = false;
  clashes = false;

  //Viewer stuff
  viewer = null;
  viewerEvent = undefined;
  viewerOriginalCenter: any = null;

  //View options
  spinning = false;
  fullScreen = false;

  ngOnInit(): void {
    this.viewer = this.populateMoleculeViewports();
    this.elem = document.documentElement;
  }



  testData: any = testData


  populateMoleculeViewports() {
    var stage = new NGL.Stage("viewport1");
    window.addEventListener("resize", function (event) {
      stage.handleResize();
    }, true);
    this.viewerEvent = stage.loadFile("rcsb://1crn", { defaultRepresentation: true }).then(function (o) {
      console.log('o', o)
      // this.viewerOriginalCenter = o.position
      // console.log('this.viewerEvent:', this.viewerEvent);
      return o;
    })
    // stage.setSpin(true);
    return stage;
  }

  centerLigand() {
    // console.log('viewerEvent:', this.viewerEvent.__zone_symbol__value.getCenter());
    // console.log('this.viewerEvent.__zone_symbol__value.getCenter(): ', this.viewerEvent.__zone_symbol__value.getCenter());


    // console.log('set viewerOriginalCenter:', this.viewerOriginalCenter);

    // this.viewerEvent.__zone_symbol__value.setPosition(this.viewerOriginalCenter)


  }

  styleChange(style: string) {
    this.viewerEvent.__zone_symbol__value.addRepresentation(style)
    // this.viewerEvent.__zone_symbol__value.addRepresentation( "ball+stick", { multipleBond: true } )
  }

  spinLigand() {
    this.spinning = !this.spinning;
    this.viewer.setSpin(this.spinning);
  }

  checkClicked(status: any, input: any) {
    switch (input) {
      case 'Water': {
        this.water = status;
      }
      case 'ions': {
        this.ions = status;
      }
      case 'hydrogens': {
        this.hydrogens = status;
      }
      case 'clashes': {
        this.clashes = status;
      }
    }
  }

  handleFullScreen() {
    // console.log('this.fullScreen:', this.fullScreen)
    // console.log('this.elem.requestFullscreen:', this.elem.requestFullscreen)
    console.log('document.fullscreen: ', document.fullscreen)
    if (!document.fullscreen) {
      this.openFullscreen()
    } else {
      this.closeFullscreen();
    }

  }

  openFullscreen() {
    if (this.elem.requestFullscreen) {
      this.elem.requestFullscreen();
      this.fullScreen = true;
    } else if (this.elem.mozRequestFullScreen) {
      /* Firefox */
      this.elem.mozRequestFullScreen();
      this.fullScreen = true;
    } else if (this.elem.webkitRequestFullscreen) {
      /* Chrome, Safari and Opera */
      this.elem.webkitRequestFullscreen();
      this.fullScreen = true;
    } else if (this.elem.msRequestFullscreen) {
      /* IE/Edge */
      this.elem.msRequestFullscreen();
      this.fullScreen = true;
    }
  }

  closeFullscreen() {
    if (this.document.exitFullscreen) {
      this.document.exitFullscreen();
      this.fullScreen = false;
    } else if (this.document.mozCancelFullScreen) {
      /* Firefox */
      this.document.mozCancelFullScreen();
      this.fullScreen = false;
    } else if (this.document.webkitExitFullscreen) {
      /* Chrome, Safari and Opera */
      this.document.webkitExitFullscreen();
      this.fullScreen = false;
    } else if (this.document.msExitFullscreen) {
      /* IE/Edge */
      this.document.msExitFullscreen();
      this.fullScreen = false;
    }
  }

}
