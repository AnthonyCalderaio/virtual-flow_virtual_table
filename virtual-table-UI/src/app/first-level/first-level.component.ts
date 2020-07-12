import { Component, OnInit, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { StoreService } from '../store.service';

@Component({
  selector: 'app-first-level',
  templateUrl: './first-level.component.html',
  styleUrls: ['./first-level.component.css'],
})
export class FirstLevelComponent {
  constructor(private router: Router, public store: StoreService) {}

  level1Click(item: any) {
    this.router.navigate(['second-level', item.key], item.value.proteinName);
  }
}
