import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'virtual-table-UI';

  proteinData = {
    "0": {
      "name": "protease2",
      "image_path": "./assets/protease2_image.png"
    },
    "1": {
      "name": "spike",
      "image_path": "./assets/spike_image.png"
    },
    "2": {
      "name": "protease",
      "image_path": "./assets/protease_image.png"
    },
    "3": {
      "name": "spike1",
      "image_path": "./assets/spike1_image.png"
    }
  }

  level1Click(item: any) {
    console.log('Clicked level 1', item);
  }
}
