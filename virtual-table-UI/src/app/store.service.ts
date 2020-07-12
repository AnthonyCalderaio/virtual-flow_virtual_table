import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class StoreService {
  private store: any;
  private promise: Promise<any>;

  async load() {
    if (this.store) {
      return Promise.resolve(this.store);
    }
    if (this.promise) {
      return this.promise;
    }
    this.promise = fetch('/assets/data.json')
      .then((request) => request.json())
      .then((data) => (this.store = data));
    return this.promise;
  }

  get data() {
    return this.store;
  }
}
