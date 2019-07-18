import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContractHistoryComponent } from './contract-history.component';

describe('ContractHistoryComponent', () => {
  let component: ContractHistoryComponent;
  let fixture: ComponentFixture<ContractHistoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContractHistoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContractHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
