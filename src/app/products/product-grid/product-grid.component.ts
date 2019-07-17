import { Component, OnInit, OnDestroy, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { Product } from '../product';
import { ProductService } from '../product.service';
import { Subscription, Observable } from 'rxjs';

@Component({
    selector: 'pm-product-grid',
    templateUrl: './product-grid.component.html',
    styleUrls: ['./product-grid.component.css'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductGridComponent implements OnInit, OnDestroy {

    // products: Observable<Product[]>;
    products: Product[];
    errorMessage: string;
    sub: Subscription;

    constructor(private productService: ProductService, private ref: ChangeDetectorRef) { }

    ngOnInit() {
        this.productService.getProducts().subscribe(
            (products: Product[]) => {
                this.products = products;
                console.log('Grid comp: this.products: ', this.products);
                this.ref.detectChanges();
            },
            (err: any) => this.errorMessage = err.error
        );

        // this.productService.getProducts();
        // this.products = this.productService.productsList;
        // console.log('Grid comp: this.products: ', this.products);

        // this.sub = this.productService.productListChanges$.subscribe(
        //     (products) => {
        //         if (!!products) {
        //             this.products = products;
        //             this.ref.detectChanges();
        //         }
        //     }
        // );
    }

    ngOnDestroy(): void {
        // this.sub.unsubscribe();
    }
}
