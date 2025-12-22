import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Bookdetailcomponent } from './bookdetailcomponent';

describe('Bookdetailcomponent', () => {
  let component: Bookdetailcomponent;
  let fixture: ComponentFixture<Bookdetailcomponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Bookdetailcomponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Bookdetailcomponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
