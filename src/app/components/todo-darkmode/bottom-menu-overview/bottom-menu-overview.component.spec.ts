import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { BottomMenuOverviewComponent } from './bottom-menu-overview.component';

describe('BottomMenuOverviewComponent', () => {
  let component: BottomMenuOverviewComponent;
  let fixture: ComponentFixture<BottomMenuOverviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [BottomMenuOverviewComponent],
      imports: [MatListModule, MatIconModule],
    }).compileComponents();

    fixture = TestBed.createComponent(BottomMenuOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('ngOnInit', () => {
    it('should set currentMode to "light" if no theme is saved', () => {
      spyOn(localStorage, 'getItem').and.returnValue(null);

      component.ngOnInit();

      expect(component.currentMode).toBe('light');
    });

    it('should set currentMode to "light" if the currentMode is "dark"', () => {
      spyOn(localStorage, 'getItem').and.returnValue('dark');

      component.ngOnInit();

      expect(component.currentMode).toBe('light');
    });

    it('should set currentMode to "dark" if the currentMode is "light"', () => {
      spyOn(localStorage, 'getItem').and.returnValue('light');

      component.ngOnInit();

      expect(component.currentMode).toBe('dark');
    });
  });
});
