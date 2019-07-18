import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageCategoryFormModalComponent } from './manage-category-form-modal.component';

describe('ManageCategoryFormModalComponent', () => {
  let component: ManageCategoryFormModalComponent;
  let fixture: ComponentFixture<ManageCategoryFormModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManageCategoryFormModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageCategoryFormModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
