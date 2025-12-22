import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Shelfdetailcomponent } from './shelfdetailcomponent';

describe('Shelfdetailcomponent', () => {
  let component: Shelfdetailcomponent;
  let fixture: ComponentFixture<Shelfdetailcomponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Shelfdetailcomponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Shelfdetailcomponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
