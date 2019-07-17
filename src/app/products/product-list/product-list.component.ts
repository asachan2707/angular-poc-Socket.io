import { Component, OnInit, OnDestroy, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';

import { Subscription, Observable } from 'rxjs';

import { Product } from '../product';
import { ProductService } from '../product.service';
import { Socket } from 'ngx-socket-io';

@Component({
    selector: 'pm-product-list',
    templateUrl: './product-list.component.html',
    styleUrls: ['./product-list.component.css'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductListComponent implements OnInit, OnDestroy {

    pageTitle = 'Products';
    errorMessage: string;
    displayCode: boolean;
    // products: Observable<Product[]>;
    products: Product[];
    selectedProduct: Product | null;
    sub = new Subscription();

    constructor(private productService: ProductService, private ref: ChangeDetectorRef, private socket: Socket) { }

    ngOnInit(): void {
        // this.sub = this.productService.selectedProductChanges$.subscribe(
        //     (selectedProduct) => {
        //         this.selectedProduct = selectedProduct;
        //         this.ref.detectChanges();
        //     }
        // );

        this.sub.add(this.productService.getProducts().subscribe(
            (products: Product[]) => {
                this.products = products;
                console.log('list comp: this.products: ', this.products);
                this.ref.detectChanges();
            },
            (err: any) => this.errorMessage = err.error
        ));

        // this.products = this.productService.getProducts();
        // this.products = this.productService.productsList;
        // console.log('list comp: this.products: ', this.products);

        // this.productService.getProducts();
        // this.socket.on('products', (products) => {
        //     console.log('[ProductListComponent] PRodcut Revi ', products);
        // });

    }

    ngOnDestroy(): void {
        this.sub.unsubscribe();
    }

    checkChanged(value: boolean): void {
        this.displayCode = value;
    }

    newProduct(): void {
        this.productService.changeSelectedProduct(this.productService.newProduct());
    }

    productSelected(product: Product): void {
        this.productService.changeSelectedProduct(product);
    }

}