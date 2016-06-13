module App {
    export class Payment extends Entity {
        constructor() {
            super();
            this.PayBy = "Cash";
        }
        SupplierId: string;
        Supplier: Supplier;
        Memo: string;
        Amount:number;
        PayBy: string;
        Remarks: string;
        
    }

}

    