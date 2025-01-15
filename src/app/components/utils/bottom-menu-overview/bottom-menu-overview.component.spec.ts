import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BottomMenuOverviewComponent } from './bottom-menu-overview.component';

describe('BottomMenuOverviewComponent', () => {
  let component: BottomMenuOverviewComponent;
  let fixture: ComponentFixture<BottomMenuOverviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BottomMenuOverviewComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BottomMenuOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
