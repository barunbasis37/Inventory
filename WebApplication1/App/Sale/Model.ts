module App {
    "use strict";

    export class BaseViewModel {
        Id: string;
    }
    export class ProductCartModel extends BaseViewModel {
        constructor(p: Product, qty: number) {
            super();
            this.Product = p;
            this.Quantity = qty;
        }
        Total(): number {
            return this.Product.SalePrice * this.Quantity;
        }
        Quantity: number;
        Product: Product;
    }
    export class CartViewModel {
        constructor() {
            this.Products = [];
            this.Total = 0;
            this.ItemTotal = 0;
            this.Discount = 0;
            this.Paid = 0;
            this.Return = 0;
            this.SaleType = 'Cash';
            this.Memo = new Date().getTime().toString();
        }
        Products: ProductCartModel[];
        Memo: string;
        ItemTotal:number;
        Total: number;
        Discount: number;
        Paid: number;
        Return: number;
        Remarks: string;
        SaleType: string;
        Card: string;
        TrxNo: string;
    }

    export class Sale extends Entity {
        constructor() {
            super();
            this.SaleDetails = [];
        }
        Memo: string;
        Total: number;
        Paid: number;
        CostTotal: number;
        ItemTotal: number;
        CardName:string;
        Discount:number;
        Return:number;
        Remarks: string;
        SaleType: string;
        TrxNo: string;
        SaleDetails: SaleDetail[];
        CustomerId: string;
        PointsEarned: number;
        PointsPaid:number;
    }

    export class SaleDetail extends Entity{
        constructor() { super(); }
        SaleId: string;
        Sale: Sale;
        ProductId: string;
        ProductName:string;
        Quantity: number;
        CostTotal: number;
        Price: number;
        Total: number;

    }

    export class SaleReport {
        constructor() {
            this.DiscountTotal = 0;
            this.ItemTotal = 0;
            this.CostPrice = 0;
            this.CashTotal = 0;
            this.CardTotal = 0;
            this.Total = 0;
        }
        ItemTotal: number;
        DiscountTotal: number;
        CostPrice: number;
        CashTotal: number;
        CardTotal: number;
        Total: number;
    }
}