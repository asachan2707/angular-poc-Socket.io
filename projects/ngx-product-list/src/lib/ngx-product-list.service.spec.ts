import { TestBed, inject } from '@angular/core/testing';

import { NgxProductListService } from './ngx-product-list.service';

describe('NgxProductListService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [NgxProductListService]
    });
  });

  it('should be created', inject([NgxProductListService], (service: NgxProductListService) => {
    expect(service).toBeTruthy();
  }));
});
