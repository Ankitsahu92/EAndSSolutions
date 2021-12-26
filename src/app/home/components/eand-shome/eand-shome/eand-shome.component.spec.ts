import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EAndSHomeComponent } from './eand-shome.component';

describe('EAndSHomeComponent', () => {
  let component: EAndSHomeComponent;
  let fixture: ComponentFixture<EAndSHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EAndSHomeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EAndSHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
