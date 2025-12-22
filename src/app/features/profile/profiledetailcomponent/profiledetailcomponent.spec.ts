import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Profiledetailcomponent } from './profiledetailcomponent';

describe('Profiledetailcomponent', () => {
  let component: Profiledetailcomponent;
  let fixture: ComponentFixture<Profiledetailcomponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Profiledetailcomponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Profiledetailcomponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
