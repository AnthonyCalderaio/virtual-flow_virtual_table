import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as wholeData2 from '../wholeData.json'

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
    // console.log('proteinData: ',this.proteinData)
  }
  testData: any = (wholeData2 as any).default

  
  

  level1Click(item: any) {
    console.log('Clicked level 1', item);
    // Object.keys(this.proteinData).forEach(item => {
    //   console.log()
    // })
    console.log(this.testData[item.key])
    this.router.navigate(['/second-level'], this.testData[item.key]);
  }
}
