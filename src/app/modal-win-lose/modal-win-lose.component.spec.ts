import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalWinLoseComponent } from './modal-win-lose.component';

describe('ModalWinLoseComponent', () => {
  let component: ModalWinLoseComponent;
  let fixture: ComponentFixture<ModalWinLoseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalWinLoseComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalWinLoseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
