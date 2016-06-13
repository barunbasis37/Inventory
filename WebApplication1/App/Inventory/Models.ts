module App {
    export class Product extends Entity {
        constructor() {
            super();
            this.Received = 0;
            this.Sold = 0;
            this.OnHand = 0;
            this.BarCode = "";             
        }
        BarCode: string;
       
        Name: string;
        GroupName: string;
        Brand: string;
        StartingInventory: number;
        Received: number;
        Sold: number;
        OnHand: number;
        MinimumRequired: number;
        CostPrice: number;
        SalePrice: number;
        BarcodeUrl:string;
    }

    export class Bookmark extends Entity {
        QuantityDiffTotal: number;
        PriceDiffTotal: number;
        Remarks: string;
        ProductBookmarks: any[];
    }

    export class  ProductBookmark extends Entity {
        BookmarkId: string;       
        ProductId: string;
        Product: {
            BarCode: string;
          
            Name: string;
            GroupName: string;
            Brand: string;
            StartingInventory: number;
            Received: number;
            Sold: number;
            OnHand: number;
            MinimumRequired: number;
            CostPrice: number;
            SalePrice: number;
        };
        SystemOnHand: number;
        PhysicalOnHand: number;
        QuantityDiff: number;
        CostPrice: number;
        PriceDiff: number;
        Remarks: string;
    }


    export class  StockDetailViewModel {
        Product: {
            BarcodeUrl: string;
            GroupName: string;
            Brand: string;
            BarCode: string;
          
            Name: string;
            StartingInventory: number;
            Received: number;
            Sold: number;
            OnHand: number;
            MinimumRequired: number;
            CostPrice: number;
            SalePrice: number;
        };
        BookmarkStartingOnHand: number;
        StartingOnHand: number;
        StockIn: number;
        StockOut: number;
        CurrentOnHand: number;
        EndOnHand: number;
        CostTotal: number;
    }

    export class   StockViewModel {
        StartDate: Date;
        EndDate: Date;
        BookmarkDate: Date;
        CostTotal: number;
        StockDetailViewModels: StockDetailViewModel[];

        constructor() {
            this.StockDetailViewModels = [];
        }
    }

    export class ProductPriceViewModel {
        constructor() {
            this.CostPriceTotal = 0;
            this.SalePriceTotal = 0;
            this.Total = 0;
        }
        CostPriceTotal: number;
        SalePriceTotal: number;
        Total: number;
    }
}

