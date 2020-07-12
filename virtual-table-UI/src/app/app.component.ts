import { Component, OnInit } from '@angular/core';
import { StoreService } from './store.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  ready = false;
  constructor(private store: StoreService) {}

  ngOnInit() {
    this.store.load()
      .then(() => {
        this.ready = true;
      });
  }
}
