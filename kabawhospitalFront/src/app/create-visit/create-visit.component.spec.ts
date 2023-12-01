import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateVisitComponent } from './create-visit.component';

describe('CreateVisitComponent', () => {
  let component: CreateVisitComponent;
  let fixture: ComponentFixture<CreateVisitComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreateVisitComponent]
    });
    fixture = TestBed.createComponent(CreateVisitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
