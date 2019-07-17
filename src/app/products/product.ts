/* Defines the product entity */
export interface Product {
    id?: number | null;
    productName?: string;
    productCode?: string;
    description?: string;
    starRating?: number;
    price?: number;
    date?: Date | string;
    value: number;
}

