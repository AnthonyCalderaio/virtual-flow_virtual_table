import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';

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

  secondLevelData = JSON.parse(JSON.stringify(this.router.getCurrentNavigation().extras))

  ngOnInit(): void {
  }

  backClicked() {
    console.log('Clicked back')
    this._location.back();
  }

}
