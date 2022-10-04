import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OldProposalComponent } from './old-proposal.component';

describe('OldProposalComponent', () => {
  let component: OldProposalComponent;
  let fixture: ComponentFixture<OldProposalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OldProposalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OldProposalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
