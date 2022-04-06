import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuperpowerFormComponent } from './superpower-form.component';

describe('SuperpowerFormComponent', () => {
  let component: SuperpowerFormComponent;
  let fixture: ComponentFixture<SuperpowerFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SuperpowerFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SuperpowerFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
