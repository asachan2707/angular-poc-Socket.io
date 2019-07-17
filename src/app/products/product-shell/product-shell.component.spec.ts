import { NO_ERRORS_SCHEMA }          from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductShellComponent }     from './product-shell.component';

let fixture: ComponentFixture<ProductShellComponent>;

describe('ProductShellComponent', () => {
  beforeEach(() => {
    fixture = TestBed.configureTestingModule({
      declarations: [ ProductShellComponent ],
      schemas:      [ NO_ERRORS_SCHEMA ]
    })
    .createComponent(ProductShellComponent);
    fixture.detectChanges();
  });

  it('should have skyblue <h2>', () => {
    const h2: HTMLElement = fixture.nativeElement.querySelector('h2');
    const bgColor = h2.style.backgroundColor;
    expect(bgColor).toBe('skyblue');
  });
});
