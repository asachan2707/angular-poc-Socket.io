import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NgxProductListComponent } from './ngx-product-list.component';

describe('NgxProductListComponent', () => {
  let component: NgxProductListComponent;
  let fixture: ComponentFixture<NgxProductListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NgxProductListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NgxProductListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
