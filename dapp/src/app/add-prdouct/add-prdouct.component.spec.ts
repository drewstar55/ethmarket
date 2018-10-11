import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddPrdouctComponent } from './add-prdouct.component';

describe('AddPrdouctComponent', () => {
  let component: AddPrdouctComponent;
  let fixture: ComponentFixture<AddPrdouctComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddPrdouctComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddPrdouctComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
