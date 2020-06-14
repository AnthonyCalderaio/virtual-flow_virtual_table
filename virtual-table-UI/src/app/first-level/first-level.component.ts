import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


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
  }

  proteinData = {
    "0": {
      "name": "protease2",
      "image_path": "./assets/protease2_image.png",
      "level2": {
        "level2_image":"./assets/level2_example_protein.png",
        "Calculations": 821004,
        "Compounds_with_docking_data": 821004,
        "docked_compounds": {
          "0": {
            "compound_identifier": "CHEMBL3814036",
            "top_scores": "GBSA -87.30, Docking -7.60, Late-Fusion 7.60,",
            "compound_image":"./assets/compound_image_1.png"
          },
          "1": {
            "compound_identifier": "CHEMBL3814036",
            "top_scores": "GBSA -87.30, Docking -7.60, Late-Fusion 7.60,",
            "compound_image":"./assets/compound_image_1.png"
          }
        }
      }
    },
    "1": {
      "name": "spike",
      "image_path": "./assets/spike_image.png",
      "level2": {
        "level2_image":"./assets/level2_example_protein.png",
        "Calculations": 821004,
        "Compounds_with_docking_data": 821004,
        "docked_compounds": {
          "0": {
            "compound_identifier": "CHEMBL3814036",
            "top_scores": "GBSA -87.30, Docking -7.60, Late-Fusion 7.60,",
            "compound_image":"./assets/compound_image_1.png"
          },
          "1": {
            "compound_identifier": "CHEMBL3814036",
            "top_scores": "GBSA -87.30, Docking -7.60, Late-Fusion 7.60,",
            "compound_image":"./assets/compound_image_1.png"
          }
        }
      }
    },
    "2": {
      "name": "protease",
      "image_path": "./assets/protease_image.png",
      "level2": {
        "level2_image":"./assets/level2_example_protein.png",
        "Calculations": 821004,
        "Compounds_with_docking_data": 821004,
        "docked_compounds": {
          "0": {
            "compound_identifier": "CHEMBL3814036",
            "top_scores": "GBSA -87.30, Docking -7.60, Late-Fusion 7.60,",
            "compound_image":"./assets/compound_image_1.png"
          },
          "1": {
            "compound_identifier": "CHEMBL3814036",
            "top_scores": "GBSA -87.30, Docking -7.60, Late-Fusion 7.60,",
            "compound_image":"./assets/compound_image_1.png"
          }
        }
      }
    },
    "3": {
      "name": "spike1",
      "image_path": "./assets/spike1_image.png",
      "level2": {
        "level2_image":"./assets/level2_example_protein.png",
        "Calculations": 821004,
        "Compounds_with_docking_data": 821004,
        "docked_compounds": {
          "0": {
            "compound_identifier": "CHEMBL3814036",
            "top_scores": "GBSA -87.30, Docking -7.60, Late-Fusion 7.60,",
            "compound_image":"./assets/compound_image_1.png"
          },
          "1": {
            "compound_identifier": "CHEMBL3814036",
            "top_scores": "GBSA -87.30, Docking -7.60, Late-Fusion 7.60,",
            "compound_image":"./assets/compound_image_1.png"
          }
        }
      }
    }
  }

  level1Click(item: any) {
    console.log('Clicked level 1', item);
    // Object.keys(this.proteinData).forEach(item => {
    //   console.log()
    // })
    console.log(this.proteinData[item.key])
    this.router.navigate(['/second-level'],this.proteinData[item.key]);
  }
}
