import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LigandDetailComponent } from './ligand-detail.component';

describe('LigandDetailComponent', () => {
  let component: LigandDetailComponent;
  let fixture: ComponentFixture<LigandDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LigandDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LigandDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
