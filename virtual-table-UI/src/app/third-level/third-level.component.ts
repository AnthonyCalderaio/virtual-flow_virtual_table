import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-third-level',
  templateUrl: './third-level.component.html',
  styleUrls: ['./third-level.component.css']
})
export class ThirdLevelComponent implements OnInit {

  constructor(
    private _location: Location,
    private router: Router) { }

  ngOnInit(): void {
    console.log('thirdLevelData: ', this.thirdLevelData);
  }

  wholeData = JSON.parse(JSON.stringify(this.router.getCurrentNavigation().extras))
  thirdLevelData = this.wholeData.this.secondLevelData.level3

  backClicked() {
    console.log('Clicked back')
    this._location.back();
  }

}
