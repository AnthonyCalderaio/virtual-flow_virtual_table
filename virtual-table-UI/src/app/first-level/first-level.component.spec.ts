import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FirstLevelComponent } from './first-level.component';

describe('FirstLevelComponent', () => {
  let component: FirstLevelComponent;
  let fixture: ComponentFixture<FirstLevelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FirstLevelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FirstLevelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
