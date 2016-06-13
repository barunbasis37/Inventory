module App {
    export class Supplier extends Entity {
        constructor() {
            super();
        }
        Name: string;
        Address: string;
        Phone: string;
        CompanyName: string;
        Remarks: string;
        Due:number;
    }

    export class SupplierHistory {
        SupplierId: string;
        Purchase: Purchase[];
        Payments: Payment[];

        constructor() {
            this.Purchase = [];
            this.Payments = [];
        }
    }

}

    