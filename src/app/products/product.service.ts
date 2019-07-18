import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Socket } from 'ngx-socket-io';
import { Observable, of, BehaviorSubject, throwError } from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';

import { Product } from './product';

@Injectable({
    providedIn: 'root',
})
export class ProductService {
    private productsUrl = 'api/products';
    private products: Product[];

    private selectedProductSource = new BehaviorSubject<Product | null>(null);
    selectedProductChanges$ = this.selectedProductSource.asObservable();

    private productListSource = new BehaviorSubject<Product[] | null>(null);
    productListChanges$ = this.productListSource.asObservable();

    productsList;

    constructor(private http: HttpClient, private socket: Socket) { }

    changeSelectedProduct(selectedProduct: Product | null): void {
        this.selectedProductSource.next(selectedProduct);
    }

    getProducts(): Observable<Product[]> {
        this.socket.emit('products');
        return this.socket.fromEvent<Product[]>('documents');
    }

    createProduct(product: Product) {
        this.socket.emit('addDoc', product);
        return this.socket.fromEvent<Product>('product');
    }

    updateProduct(product: Product) {
        this.socket.emit('editDoc', product);
        return this.socket.fromEvent<Product>('product');
    }
    deleteProduct(product: Product) {
        this.socket.emit('deleteDoc', product);
        return null;
    }

    // Return an initialized product when try to add new product
    newProduct(): Product {
        return {
            id: 0,
            productName: '',
            productCode: 'New',
            description: '',
            starRating: 0,
            date: new Date(),
            value: 200,
        };
    }

    private handleError(err) {
        let errorMessage: string;
        if (err.error instanceof ErrorEvent) {
            errorMessage = `An error occurred: ${err.error.message}`;
        } else {
            errorMessage = `Backend returned code ${err.status}: ${err.body.error}`;
        }
        console.error(err);
        return throwError(errorMessage);
    }

}
