module App {
    export class Customer extends Entity {
        constructor() {
            super();
            this.Name = "Annonymous";
            this.Id = "00000000-0000-0000-0000-000000000000";
            this.Point = 0;
            this.MembarshipCardNo = "0";
        }
        Name: string;
        Address: string;
        Phone: string;
        MembarshipCardNo: string;
        Email: string;
        Point:number;
    }

    export class CustomerHistory {
        CustomerId: string;
        Purchase: Purchase[];
        Payments: Payment[];

        constructor() {
            this.Purchase = [];
            this.Payments = [];
        }
    }

}

    