module App {
    export class Purchase extends Entity {
        constructor() {
            super();
        }
        Memo: string;
        Total: number;
        SupplierId: string;        
        Remarks: string;
    }

    export class PurchaseDetail extends Entity {
        constructor() {
            super();
            this.Total = 0;
            this.Quantity = 0;
            this.Price = 0;
        }

        ProductId: string;
        PurchaseId: string;
        Quantity: number;
        Price: number;
        Total: number;
        Remarks: string;
    }
}

    