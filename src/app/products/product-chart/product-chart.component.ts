import { Component, ViewEncapsulation, OnInit, ChangeDetectorRef, ChangeDetectionStrategy } from '@angular/core';

import * as d3 from 'd3-selection';
import * as d3Scale from 'd3-scale';
import * as d3Shape from 'd3-shape';
import * as d3Array from 'd3-array';
import * as d3Axis from 'd3-axis';

import { ProductService } from '../product.service';
import { Product } from '../product';
import { productMockData } from './productMockData';

@Component({
    selector: 'pm-product-chart',
    encapsulation: ViewEncapsulation.None,
    templateUrl: './product-chart.component.html',
    styleUrls: ['./product-chart.component.css'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductChartComponent implements OnInit {

    title = 'Line Chart';
    products: Product[];
    errorMessage: string;
    private margin = { top: 20, right: 20, bottom: 30, left: 50 };
    private width: number;
    private height: number;
    private x: any;
    private y: any;
    private svg: any;
    private line: d3Shape.Line<[number, number]>;

    constructor(private productService: ProductService, private ref: ChangeDetectorRef) {
        this.width = 900 - this.margin.left - this.margin.right;
        this.height = 500 - this.margin.top - this.margin.bottom;
    }

    ngOnInit() {

        const productList = this.getProducts();
        console.log('productList: ', productList);
        this.initSvg();
        this.initAxis(productMockData);
        this.drawAxis();
        this.drawLine(productMockData);
    }

    getProducts(): Product[] {
        let productList = [];
        this.productService.getProducts().subscribe(
            (products: Product[]) => {
                productList = products;
                this.ref.detectChanges();
            },
            (err: any) => this.errorMessage = err.error
        );
        return productList;
    }

    initSvg() {
        this.svg = d3.select('svg')
            .append('g')
            .attr('transform', 'translate(' + this.margin.left + ',' + this.margin.top + ')');
    }

    initAxis(productList: Product[]) {
        this.x = d3Scale.scaleTime().range([0, this.width]);
        this.y = d3Scale.scaleLinear().range([this.height, 0]);
        this.x.domain(d3Array.extent(productList, (d) => d.date));
        this.y.domain(d3Array.extent(productList, (d) => d.value));
    }

    drawAxis() {
        this.svg.append('g')
            .attr('class', 'axis axis--x')
            .attr('transform', 'translate(0,' + this.height + ')')
            .call(d3Axis.axisBottom(this.x));

        this.svg.append('g')
            .attr('class', 'axis axis--y')
            .call(d3Axis.axisLeft(this.y))
            .append('text')
            .attr('class', 'axis-title')
            .attr('transform', 'rotate(-90)')
            .attr('y', 6)
            .attr('dy', '.71em')
            .style('text-anchor', 'end')
            .text('Price ($)');
    }

    drawLine(productList) {
        this.line = d3Shape.line()
            .x((d: any) => this.x(d.date))
            .y((d: any) => this.y(d.value));

        this.svg.append('path')
            .datum(productList)
            .attr('class', 'line')
            .attr('d', this.line);
    }
}
