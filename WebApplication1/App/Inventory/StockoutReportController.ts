module App {
    export class StockoutReportController {
        SearchService: SearchService;
        Url: UrlService;
        SearchRequest: SearchRequest;
        Models:  Product[];
        ProductPriceViewModel: ProductPriceViewModel;
  
        static $inject: string[] = ["$location", "UrlService", "SearchService", "SaveService"];

        constructor(private $location: angular.ILocationService, url: UrlService, search: SearchService, save: SaveService) {
            this.Url = url;
            this.SearchService = search;
        
            this.Activate();
        }

        Activate() {
            this.Models = [];           
            this.SearchRequest = new SearchRequest("", "Modified", "False", "");
            this.SearchRequest.Page = 1;
            this.SearchRequest["MaxQuantity"] = 10;
            this.Search();
            this.ProductPriceViewModel = new ProductPriceViewModel();
        }

        Search(): void {
            var self = this;
            var successCallback = (response: SearchResponse): void => {
                self.Models = <any>response.Models;
                self.ProductPriceViewModel = new ProductPriceViewModel();
                for (var i = 0; i < self.Models.length; i++) {
                    self.ProductPriceViewModel.CostPriceTotal += self.Models[i].CostPrice;
                    self.ProductPriceViewModel.SalePriceTotal += self.Models[i].SalePrice;
                    self.ProductPriceViewModel.Total += self.Models[i].OnHand * self.Models[i].CostPrice;
                }
            };
            var errorCallback = (error: any): void => {
                console.log(error);
            };
            self.SearchService.Search(self.SearchRequest, self.Url.ProductQueryData).then(<any>successCallback, errorCallback);

            var countSuccessCallback = (response: SearchResponse): void => {
                self.SearchRequest.TotalPage = Math.ceil(response.Data / 10);
            };
            var countErrorCallback = (error: any): void => {
                console.log(error);
            };
            self.SearchService.Search(self.SearchRequest, self.Url.ProductQueryCount).then(<any>countSuccessCallback, countErrorCallback);
        }         

        Goto(page: number): void {
            this.SearchRequest.Page = page;
            this.Search();
        }
    }

    angular.module("app").controller("StockoutReportController", StockoutReportController);
}