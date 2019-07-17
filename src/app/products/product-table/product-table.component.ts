import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'pm-product-table',
    templateUrl: './product-table.component.html',
    styleUrls: ['./product-table.component.css']
})
export class ProductTableComponent implements OnInit {

    data: any;
    constructor() { }

    ngOnInit() {
        this.generateLocalBulkData();
    }

    generateLocalBulkData() {
        let temp = [];
        setTimeout(() => {
            temp = this.generateObj(temp);
            this.data = temp;
            console.log('this.data: ', this.data);
        }, 1000);
    }

    generateObj(temp) {
        for (let i = 0; i <= 999999; i++) {
            const obj = {
                id: 'Product-id_' + (i + 1),
                name: 'Product-' + (i + 1),
                type: (i % 3) === 0 ? 'Electronic' : 'Home-appliances',
                price: Math.random() * (2000 - 200) + 200,
                is_available: (i % 2) === 0 ? true : false
            };
            temp.push(obj);
        }
        return temp;
    }

}
