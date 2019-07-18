import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'lib-ngx-product-list',
  templateUrl: './ngx-product-list.component.html',
  styles: []
})
export class NgxProductListComponent implements OnInit {

  @Input() name = 'test';
  @Input() items = [];
  constructor() { }

  ngOnInit() {
  }

}
