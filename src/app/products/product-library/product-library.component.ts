import { Component, OnInit } from '@angular/core';
import { ProductService } from '../product.service';
import { Subscription } from 'rxjs';
import { Product } from '../product';

@Component({
  selector: 'pm-product-library',
  templateUrl: './product-library.component.html',
  styleUrls: ['./product-library.component.css']
})
export class ProductLibraryComponent implements OnInit {

  products: Product[];
  errorMessage: string;
  sub: Subscription;

    constructor(private productService: ProductService) { }


  ngOnInit() {
    this.sub = this.productService.getProducts().subscribe(
      (products: Product[]) => {
          this.products = products;
      },
      (err: any) => this.errorMessage = err.error
  );
  }

}
