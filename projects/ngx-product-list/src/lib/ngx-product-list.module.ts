import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgxProductListComponent } from './ngx-product-list.component';

@NgModule({
  imports: [
    BrowserModule
  ],
  declarations: [NgxProductListComponent],
  exports: [NgxProductListComponent]
})
export class NgxProductListModule { }
