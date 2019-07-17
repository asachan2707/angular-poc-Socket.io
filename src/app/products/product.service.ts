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

    getDocument(id: string) {
        this.socket.emit('getDoc', id);
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

    getProducts1(): Observable<Product[]> {
        if (this.products) {
            return of(this.products);
        }
        return this.http.get<Product[]>(this.productsUrl)
            .pipe(
                tap(data => console.log(JSON.stringify(data))),
                tap(data => this.products = data),
                catchError(this.handleError)
            );
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

    createProduct1(product: Product): Observable<Product> {
        const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        product.id = null;
        return this.http.post<Product>(this.productsUrl, product, { headers: headers })
            .pipe(
                tap(data => console.log('createProduct: ' + JSON.stringify(data))),
                tap(data => {
                    this.products.push(data);
                    this.productListSource.next(this.products);
                }),
                catchError(this.handleError)
            );
    }

    deleteProduct1(id: number): Observable<{}> {
        const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        const url = `${this.productsUrl}/${id}`;
        return this.http.delete<Product>(url, { headers: headers })
            .pipe(
                tap(data => console.log('deleteProduct: ' + id)),
                tap(data => {
                    const foundIndex = this.products.findIndex(item => item.id === id);
                    if (foundIndex > -1) {
                        this.products.splice(foundIndex, 1);
                        this.productListSource.next(this.products);
                    }
                }),
                catchError(this.handleError)
            );
    }

    updateProduct1(product: Product): Observable<Product> {
        const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        const url = `${this.productsUrl}/${product.id}`;
        return this.http.put<Product>(url, product, { headers: headers })
            .pipe(
                tap(() => console.log('updateProduct: ' + product.id)),
                tap(() => {
                    const foundIndex = this.products.findIndex(item => item.id === product.id);
                    if (foundIndex > -1) {
                        this.products[foundIndex] = product;
                        this.productListSource.next(this.products);
                    }
                }),
                map(() => product),
                catchError(this.handleError)
            );
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
