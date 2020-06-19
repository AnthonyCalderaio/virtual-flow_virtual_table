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
    // console.log('Whats: ', wholeData2);
  }

  proteinData = {
    "0": {
      "level1": {
        "name": "protease2",
        "image_path": "./assets/protease2_image.png",
      },
      "level2": {
        "level2_image": "./assets/level2_example_protein.png",
        "Calculations": 821004,
        "Compounds_with_docking_data": 821004,
        "docked_compounds": {
          "0": {
            "compound_identifier": "CHEMBL3814036",
            "top_scores": "GBSA -87.30, Docking -7.60, Late-Fusion 7.60,",
            "compound_image": "./assets/compound_image_1.png"
          },
          "1": {
            "compound_identifier": "CHEMBL3814036",
            "top_scores": "GBSA -87.30, Docking -7.60, Late-Fusion 7.60,",
            "compound_image": "./assets/compound_image_1.png"
          }
        }
      },
      "level3": {
        "compound_identifier": "CHEMBL3814036",
        "compound_image": "./assets/compound_image_1.png",
        "SMILES_string": "C[C@@H]1[C@H]2C3=CC[C@@H]4[C@@]5(C)CC[C@H](O)C(C)(C)[C@@H]5CC[C@@]4(C)[C@]3(C)CC[C@@]2(C(=O)OCc2cn(CC(O)=N[C@@H](CCCNC(=[NH2+])[NH3+])C(O)=N[C@@H](CCCNC(=N)N)C(O)=N[C@@H](CCCNC(=N)N)C(=O)O)nn2)CC[C@H]1C",
        "InChl_Key": "GKNSMGFXTBNLAT-HKSIVZNOSA-P",
        "Calculations": 4,
        "Receptor with docking data": 4,
        "Groupings": "ChEMBL",
        "Chemical Descriptors":
        {
          "PEOE_PC+": 10.154663,
          "PEOE_PC-_per_atom": -0.0202
        }

      }
    },
    "1": {
      "level1": {
        "name": "spike",
        "image_path": "./assets/spike_image.png",
      },
      "level2": {
        "level2_image": "./assets/level2_example_protein.png",
        "Calculations": 821004,
        "Compounds_with_docking_data": 821004,
        "docked_compounds": {
          "0": {
            "compound_identifier": "CHEMBL3814036",
            "top_scores": "GBSA -87.30, Docking -7.60, Late-Fusion 7.60,",
            "compound_image": "./assets/compound_image_1.png"
          },
          "1": {
            "compound_identifier": "CHEMBL3814036",
            "top_scores": "GBSA -87.30, Docking -7.60, Late-Fusion 7.60,",
            "compound_image": "./assets/compound_image_1.png"
          }
        }
      }

    },
    "2": {
      "level1": {
        "name": "protease",
        "image_path": "./assets/protease_image.png",
      },
      "level2": {
        "level2_image": "./assets/level2_example_protein.png",
        "Calculations": 821004,
        "Compounds_with_docking_data": 821004,
        "docked_compounds": {
          "0": {
            "compound_identifier": "CHEMBL3814036",
            "top_scores": "GBSA -87.30, Docking -7.60, Late-Fusion 7.60,",
            "compound_image": "./assets/compound_image_1.png"
          },
          "1": {
            "compound_identifier": "CHEMBL3814036",
            "top_scores": "GBSA -87.30, Docking -7.60, Late-Fusion 7.60,",
            "compound_image": "./assets/compound_image_1.png"
          }
        }
      }
    },
    "3": {
      "level1": {
        "name": "spike1",
        "image_path": "./assets/spike1_image.png",
      },
      "level2": {
        "level2_image": "./assets/level2_example_protein.png",
        "Calculations": 821004,
        "Compounds_with_docking_data": 821004,
        "docked_compounds": {
          "0": {
            "compound_identifier": "CHEMBL3814036",
            "top_scores": "GBSA -87.30, Docking -7.60, Late-Fusion 7.60,",
            "compound_image": "./assets/compound_image_1.png"
          },
          "1": {
            "compound_identifier": "CHEMBL3814036",
            "top_scores": "GBSA -87.30, Docking -7.60, Late-Fusion 7.60,",
            "compound_image": "./assets/compound_image_1.png"
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
    this.router.navigate(['/second-level'], this.proteinData[item.key]);
  }
}
