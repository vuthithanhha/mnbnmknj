import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivefailedComponent } from './activefailed.component';

describe('ActivefailedComponent', () => {
  let component: ActivefailedComponent;
  let fixture: ComponentFixture<ActivefailedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ActivefailedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActivefailedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
