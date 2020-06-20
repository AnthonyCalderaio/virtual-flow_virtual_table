import { Component, OnInit, AfterViewChecked } from '@angular/core';
import { Router } from '@angular/router';
import testData from '../app/testData.json'
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, AfterViewChecked {


  title = 'virtual-table-UI';

  constructor(
    private router: Router
  ) {

  } 
  ngAfterViewChecked(): void {
    // this.router.navigate(['/third-level'], this.testDataParsed)
  }
  testDataParsed = (<any>testData);


  ngOnInit() {
    console.log('testDataParsed:',this.testDataParsed)
    console.log()
    this.router.navigate(['/first-level'])
    
  }

}
